package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"github.com/lib/pq"
	"net/http"
	"strconv"
)

type DishHandler struct {
	r repo.DishRepository
}

func (h *DishHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	d, err := h.r.Get(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

func (h *DishHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.r.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Dish successfully Deleted")
}

func (h *DishHandler) List(c echo.Context) error {
	ds, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

// TODO
func (h *DishHandler) Add(c echo.Context) error {
	restID := c.Param("restaurantId")

	binder := echo.QueryParamsBinder(c)

	var dish model.Dish
	var tempIngredients []string

	err := binder.String("name", &dish.Name).
		String("category", &dish.Category).
		Strings("ingredients", &tempIngredients).
		Float32("price", &dish.Price).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	dish.Ingredients = pq.StringArray(tempIngredients) //binder tarafıdan kabul edilmeyen pq.StringArray ini dışardan ekledim
	dish.RestaurantId = restID

	d, err := h.r.Add(dish)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

// TODO
func (h *DishHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	var dish model.Dish
	h.db.First(&dish, id)

	binder := echo.QueryParamsBinder(c)

	var tempIngredients []string

	err = binder.String("name", &dish.Name).
		String("category", &dish.Category).
		Strings("ingredients", &tempIngredients).
		Float32("price", &dish.Price).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	dish.Ingredients = pq.StringArray(tempIngredients) //binder tarafıdan kabul edilmeyen pq.StringArray ini dışardan ekledim

	result := h.db.Save(&dish)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Dish successfully updated")
}

func (h *DishHandler) GetWithRestaurantId(c echo.Context) error {
	restId := c.Param("restaurantId")
	id, err := strconv.Atoi(restId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	ds, err := h.r.GetWithRestaurantId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *DishHandler) GetWithCategory(c echo.Context) error {
	cat := c.Param("category")

	ds, err := h.r.GetWithCategory(cat)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}
