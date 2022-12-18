package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type RatingHandler struct {
	r repo.RatingRepository
}

// TODO
func (h *RatingHandler) Add(c echo.Context) error {
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

	result := h.db.Create(&rating)

	if result.Error != nil {
		fmt.Print(result.Error)
		return c.JSON(http.StatusBadRequest, "DB error")
	}
	return c.JSON(http.StatusOK, "Rating successfully added")
}

func (h *RatingHandler) Delete(c echo.Context) error {
	idStr := c.Param("ratingId")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.r.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Rating successfully Deleted")
}

func (h *RatingHandler) GetWithUser(c echo.Context) error {
	userId := c.Param("id")
	id, err := strconv.Atoi(userId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", userId))
	}

	rs, err := h.r.GetWithUserId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, rs)
}

func (h *RatingHandler) GetWithRestaurant(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	rs, err := h.r.GetWithRestaurantId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RatingHandler) GetRestaurantAverage(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	avg, err := h.r.GetWithAverage(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, avg)
}
