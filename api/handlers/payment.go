package handlers

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"math"
	"net/http"
	"strconv"
	"strings"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
)

type PaymentHandler struct {
	orderService     *service.OrderService
	userService      *service.UserService
	orderDishService *service.OrderDishService
}

type paymentRequest struct {
	BasketItems  []model.Dish `json:"basketItems"`
	BuyerID      int          `json:"buyerID"`
	TableID      string       `json:"tableID"`
	RestaurantID string       `json:"restaurantID"`
}

type paymentDish struct {
	id        string
	name      string
	category1 string
	itemType  string
	price     string
}

type paymentBuyer struct {
	id                  string
	name                string
	surname             string
	identityNumber      string
	city                string
	country             string
	email               string
	ip                  string
	registrationAddress string
}

type paymentResult struct {
	request string
}

type paymentToken struct {
	Token string `form:"token"`
}

func (h *PaymentHandler) CreatePaymentWithForm(c echo.Context) error {

	var rbind paymentRequest
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	var orderDishes []model.OrderDish

	for i := 0; i < len(rbind.BasketItems); i++ {
		temp := model.OrderDish{
			DishId: strconv.Itoa(int(rbind.BasketItems[i].ID)),
		}
		orderDishes = append(orderDishes, temp)
	}

	tempOrder := model.Order{
		TableId:      rbind.TableID,
		RestaurantId: rbind.RestaurantID,
	}

	order, err := h.orderService.Add(tempOrder)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	for i := 0; i < len(orderDishes); i++ {
		orderDishes[i].OrderId = strconv.Itoa(int(order.ID))
	}

	for i := 0; i < len(orderDishes); i++ {
		_, err := h.orderDishService.Add(orderDishes[i])
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
	}

	buyer, _ := h.userService.Get(rbind.BuyerID)

	resp := fmt.Sprintf("{") +
		fmt.Sprintf("%q:%q,", "conversationId", strconv.FormatUint(uint64(order.ID), 10)) +
		fmt.Sprintf("%q:%q,", "callbackUrl", "http://52.57.220.100/restaurants/orderCallback") +
		fmt.Sprintf("%q:%q,", "price", getPrice(rbind.BasketItems)) +
		fmt.Sprintf("%q:%q,", "paidPrice", getPrice(rbind.BasketItems)) +
		fmt.Sprintf("%q:%q,", "currency", "TRY") +
		fmt.Sprintf("%q:%s,", "enabledInstallments", "[1]") +
		fmt.Sprintf("%q:%q,", "paymentChannel", "MOBILE") +
		fmt.Sprintf("%q:%s", "buyer", "{") +
		fmt.Sprintf("%q:%q,", "id", strconv.Itoa(int(buyer.ID))) +
		fmt.Sprintf("%q:%q,", "name", buyer.Name) +
		fmt.Sprintf("%q:%q,", "surname", buyer.Surname) +
		fmt.Sprintf("%q:%q,", "identityNumber", "74300864791") +
		fmt.Sprintf("%q:%q,", "city", "Ankara") +
		fmt.Sprintf("%q:%q,", "country", "Turkey") +
		fmt.Sprintf("%q:%q,", "email", buyer.Mail) +
		fmt.Sprintf("%q:%q,", "ip", "3.70.155.6") +
		fmt.Sprintf("%q:%q},", "registrationAddress", "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1") +
		fmt.Sprintf("%q:%s", "billingAddress", "{") +
		fmt.Sprintf("%q:%q,", "contactName", buyer.Name) +
		fmt.Sprintf("%q:%q,", "city", "Ankara") +
		fmt.Sprintf("%q:%q,", "country", "Turkey") +
		fmt.Sprintf("%q:%q},", "address", "Nidakule Göztepe, Merdivenköy Mah. Bora Sok. No:1") +
		fmt.Sprintf("%q:%s}", "basketItems", prepareDishes(rbind.BasketItems))

	resp = strings.ReplaceAll(resp, "\\", "")
	resp = strings.ReplaceAll(resp, "\"", `"`)

	return c.JSON(http.StatusOK, resp)
}

// TODO:This is just a place holder
func (h *PaymentHandler) SetPaymentResult(c echo.Context) error {
	var rbind paymentResult
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rbind.request)
}

func (h *PaymentHandler) PaymentCallBackURL(c echo.Context) error {
	var token paymentToken
	fmt.Printf("Before token bind\n")
	err := (&echo.DefaultBinder{}).Bind(&token, c)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	fmt.Printf("After token bind: ")
	fmt.Println(token)

	body := []byte(`{"token":"` + token.Token + `"}`)
	url := "https://reot3nxkw2g4yofbhaiz4s5v7i0obstg.lambda-url.eu-central-1.on.aws/"

	fmt.Printf("Before Awspost")
	fmt.Println(string(body))

	var awsResponse map[string]interface{}

	//TODO cast the resp to map[string string] then compare to "paymentStatus" = "SUCCESS"
	awsRequest, err := http.NewRequest(http.MethodPost, url, bytes.NewBuffer(body))
	awsRequest.Header.Add("Content-type", "application/json")
	client := &http.Client{}

	res, err := client.Do(awsRequest)
	if err != nil {
		panic(err)
	}
	fmt.Printf("After Aws Post\n")

	body, err = ioutil.ReadAll(res.Body)

	defer res.Body.Close()
	json.Unmarshal([]byte(body), &awsResponse)

	fmt.Printf("After response unmarshal")

	status := awsResponse["status"]
	fmt.Println(status, string(body))

	return c.JSON(http.StatusOK, nil)
}

func prepareDishes(dishes []model.Dish) string {
	finalDishes := "["

	for i := 0; i < len(dishes); i++ {
		//this mess is because floating points suck and we have to round them down to 2 precision
		//and also math library pretends like float 32 doesn't exist which we use so on top of every thing we have to cast them
		//to float 64 so we can finally have this abomination of a line same thing is present in getPrices Function
		price := fmt.Sprintf("%f", math.Ceil(float64(dishes[i].Price*100))/100)
		fmt.Printf("dishid: %d\n", dishes[i].ID)

		finalDishes += fmt.Sprintf("{%q:%q,", "id", fmt.Sprintf("%d", dishes[i].ID)) +
			fmt.Sprintf("%q:%q,", "name", dishes[i].Name) +
			fmt.Sprintf("%q:%q,", "category1", dishes[i].Category) +
			fmt.Sprintf("%q:%q,", "itemType", "VIRTUAL") +
			fmt.Sprintf("%q:%q},", "price", price)
	}
	finalDishes = strings.Trim(finalDishes, ",")
	finalDishes += "]"

	return finalDishes
}

func getPrice(dishes []model.Dish) string {
	var price float64 = 0.0

	for i := 0; i < len(dishes); i++ {
		price = price + math.Ceil(float64(dishes[i].Price*100))/100
	}

	return fmt.Sprintf("%f", price)
}
