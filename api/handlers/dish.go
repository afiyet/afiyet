package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type DishHandler struct {
	s *service.DishService
}

// cur-res

func (h *DishHandler) Add(c echo.Context) error {
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

func (h *DishHandler) Delete(c echo.Context) error {
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

func (h *DishHandler) Update(c echo.Context) error {
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
