package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type DishHandler struct {
	r repo.DishRepository
}

func (h *DishHandler) Add(c echo.Context) error {
	var dbind model.Dish

	err := (&echo.DefaultBinder{}).BindBody(c, &dbind)
	if err != nil {
		return err
	}

	d, err := h.r.Add(dbind)
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

func (h *DishHandler) Get(c echo.Context) error {
	restaurantId := c.QueryParam("restaurantId")

	if restaurantId == "" {
		return h.normalGet(c)
	}

	return h.getWithCategory(c)
}

func (h *DishHandler) normalGet(c echo.Context) error {
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

func (h *DishHandler) getWithCategory(c echo.Context) error {
	cat := c.Param("category")

	ds, err := h.r.GetWithCategory(cat)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *DishHandler) List(c echo.Context) error {
	ds, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
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

	d, err := h.r.Update(dbind)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}
