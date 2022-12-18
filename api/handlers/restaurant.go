package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type RestaurantHandler struct {
	r repo.RestaurantRepository
}

func (h *RestaurantHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	res, err := h.r.Get(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}

func (h *RestaurantHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.r.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Restaurant successfully Deleted")
}

func (h *RestaurantHandler) List(c echo.Context) error {

	rs, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

// TODO
func (h *RestaurantHandler) Add(c echo.Context) error {

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

	result := h.db.Create(&restaurant)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Restaurant successfully added")
}

// TODO
func (h *RestaurantHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var restaurant Restaurant
	h.db.First(&restaurant, id)

	binder := echo.QueryParamsBinder(c)
	err := binder.String("name", &restaurant.Name).
		String("address", &restaurant.Address).
		String("category", &restaurant.Category).
		BindError() // returns first binding error
	if err != nil {
		bErr := err.(*echo.BindingError)
		return fmt.Errorf("request query parameters binding error for field: %s values: %v", bErr.Field, bErr.Values)
	}

	result := h.db.Save(&restaurant)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "Restaurant successfully updated")
}
