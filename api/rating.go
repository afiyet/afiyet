package main

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type Rating struct {
	gorm.Model   //has ID, CreatedAt, UpdatedAt, DeletedAt
	UserId       string
	User         User `gorm:"foreignKey:UserId"`
	RestaurantId string
	Restaurant   Restaurant `gorm:"foreignKey:RestaurantId"`
	Comment      string
	Point        uint16
}

func (handler *RatingHandler) GetwithUser(c echo.Context) error {
	userId := c.Param("id")
	var ratings []Rating

	handler.db.AutoMigrate(&Rating{})
	result := handler.db.Where("user_id = ?", userId).Find(&ratings)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, ratings)
}

func (handler *RatingHandler) GetwithRestourant(c echo.Context) error {
	restId := c.Param("id")
	var ratings []Rating

	handler.db.AutoMigrate(&Rating{})
	result := handler.db.Where("restaurant = ?", restId).Find(&ratings)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, ratings)
}

func (handler *RatingHandler) GetRestaurantAverage(c echo.Context) error {
	restId := c.Param("id")

	var average float64
	row := handler.db.Table("ratings").Where("restaurant = ?", restId).Select("avg(point)").Row()
	row.Scan(&average)

	return c.JSON(http.StatusOK, average)
}

func (handler *RatingHandler) Delete(c echo.Context) error {
	idStr := c.Param("ratingId")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	handler.db.AutoMigrate(&Rating{})

	result := handler.db.Delete(&Rating{}, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "Rating not found")
	}

	return c.JSON(http.StatusOK, "Rating successfully Deleted")
}

func (handler *RatingHandler) Add(c echo.Context) error {
	restId := c.Param("restaurantId")
	userId := c.Param("userId")

	rating := Rating{RestaurantId: restId, UserId: userId}

	binder := echo.QueryParamsBinder(c)

	err := binder.String("comment", &rating.Comment).
		Uint16("point", &rating.Point).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	handler.db.AutoMigrate(&Rating{})

	result := handler.db.Create(&rating)

	if result.Error != nil {
		fmt.Print(result.Error)
		return c.JSON(http.StatusBadRequest, "DB error")
	}
	return c.JSON(http.StatusOK, "Rating successfully added")
}
