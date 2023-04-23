package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
)

type OrderDishHandler struct {
	// TODO(umutcil) ?
	s *service.DishService
}

func (h *OrderDishHandler) Add(c echo.Context) error {
	var dbind model.Dish

	err := (&echo.DefaultBinder{}).BindBody(c, &dbind)
	if err != nil {
		return err
	}

	d, err := h.s.Add(dbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

func (h *OrderDishHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.s.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Dish successfully Deleted")
}

func (h *OrderDishHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	d, err := h.s.Get(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

func (h *OrderDishHandler) List(c echo.Context) error {
	ds, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *OrderDishHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return err
	}

	var dbind model.Dish
	err = (&echo.DefaultBinder{}).BindBody(c, &dbind)
	if err != nil {
		return err
	}
	dbind.ID = uint(id)

	d, err := h.s.Update(dbind)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}
