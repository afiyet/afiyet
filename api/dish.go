package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Dish struct {
	gorm.Model          //has ID, CreatedAt, UpdatedAt, DeletedAt
	RestaurantId string //TODO ! restoran branch merge edildiğinde burası restaurantId	Restaurant şeklinde değiştirilmeli
	Name         string
	Category     string
	Ingredients  pq.StringArray `gorm:"type:text[]"`
	Price        float32
}

type DishRepository interface {
	Get(id string) (*Dish, error)
	Delete(id string) error
	List() ([]Dish, error)
	Add(restaurantId string, name string, category string, ingredients []string, price float32) error
	Update(id string, restaurantId string, name string, category string, ingredients []string, price float32) error
	GetwithRestId(restaurantId string) ([]Dish, error)
	GetwithCategory(category string) ([]Dish, error)
}

func (handler *DishHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	//u, err := handler.repo.Get(id)
	handler.db.AutoMigrate(&Dish{})

	var dish Dish

	result := handler.db.First(&dish, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "Dish not found")
	}

	return c.JSON(http.StatusOK, dish)
}

func (handler *DishHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	handler.db.AutoMigrate(&Dish{})

	result := handler.db.Delete(&Dish{}, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "Dish not found")
	}

	return c.JSON(http.StatusOK, "Dish successfully Deleted")
}

func (handler *DishHandler) List(c echo.Context) error {

	var dishes []Dish

	result := handler.db.Find(&dishes)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, dishes)
}

func (handler *DishHandler) Add(c echo.Context) error {
	restID := c.Param("restaurantId")

	binder := echo.QueryParamsBinder(c)

	var dish Dish
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

	handler.db.AutoMigrate(&Dish{})

	result := handler.db.Create(&dish)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}
	return c.JSON(http.StatusOK, "Dish successfully added")
}

func (handler *DishHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	var dish Dish
	handler.db.AutoMigrate(&Dish{})
	handler.db.First(&dish, id)

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

	handler.db.AutoMigrate(&Dish{})

	result := handler.db.Save(&dish)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Dish successfully updated")
}

func (handler *DishHandler) GetwithRestId(c echo.Context) error {
	restID := c.Param("restaurantId")
	var dishes []Dish

	handler.db.AutoMigrate(&Dish{})
	result := handler.db.Where("restaurant_id = ?", restID).Find(&dishes)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, dishes)
}

func (handler *DishHandler) GetwithCategory(c echo.Context) error {
	category := c.Param("category")
	var dishes []Dish

	handler.db.AutoMigrate(&Dish{})
	result := handler.db.Where("category = ?", category).Find(&dishes)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, dishes)
}
