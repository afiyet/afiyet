package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Restaurant struct {
	gorm.Model
	Name     string
	Address  string
	Category string
	Dishes   []Dish   `gorm:"-"`
	Ratings  []Rating `gorm:"-"`
}

type RestaurantRepository interface {
	Get(id string) (*Restaurant, error)
	Delete(id string) error
	List() ([]Restaurant, error)
	Add(name string, address string, category string) error
}

func (handler *RestaurantHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = handler.db.AutoMigrate(&Restaurant{})

	var restaurant Restaurant

	result := handler.db.First(&restaurant, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "Restaurant not found")
	}
	return c.JSON(http.StatusOK, restaurant)
}

func (handler *RestaurantHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = handler.db.AutoMigrate(&Restaurant{})

	if err != nil {
		log.Fatal(err)
	}

	result := handler.db.Delete(&Restaurant{}, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "Restaurant not found")
	}

	return c.JSON(http.StatusOK, "Restaurant successfully Deleted")
}

func (handler *RestaurantHandler) List(c echo.Context) error {

	var restaurants []Restaurant

	result := handler.db.Find(&restaurants)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, restaurants)
}

func (handler *RestaurantHandler) Add(c echo.Context) error {

	binder := echo.QueryParamsBinder(c)

	var restaurant Restaurant
	err := binder.String("name", &restaurant.Name).
		String("address", &restaurant.Address).
		String("category", &restaurant.Category).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	handler.db.AutoMigrate(&Restaurant{})
	result := handler.db.Create(&restaurant)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Restaurant successfully added")
}

func (handler *RestaurantHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var restaurant Restaurant
	handler.db.AutoMigrate(&Restaurant{})
	handler.db.First(&restaurant, id)

	binder := echo.QueryParamsBinder(c)
	err := binder.String("name", &restaurant.Name).
		String("address", &restaurant.Address).
		String("category", &restaurant.Category).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	handler.db.AutoMigrate(&Restaurant{})
	result := handler.db.Save(&restaurant)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Restaurant successfully updated")
}

type RestaurantMockRepository struct {
	restaurants []Restaurant
}

func (m *RestaurantMockRepository) Get(id string) (*Restaurant, error) {
	for _, v := range m.restaurants {
		uintID, _ := strconv.ParseUint(id, 10, 32)
		if v.Model.ID == uint(uintID) {
			return &v, nil
		}
	}
	return nil, errors.New("not found")
}
