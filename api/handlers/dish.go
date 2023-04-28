package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"strings"
)

type DishHandler struct {
	s *service.DishService
}

func (h *DishHandler) Add(c echo.Context) error {
	var dbind model.Dish

	err := (&echo.DefaultBinder{}).BindBody(c, &dbind)
	if err != nil {
		return err
	}

	base64, extension, err := parseRawBase64(dbind.Picture)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	dbind.Picture = base64

	d, err := h.s.Add(dbind, extension)
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

	d, err := h.s.Get(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

func (h *DishHandler) getWithCategory(c echo.Context) error {
	cat := c.Param("category")

	ds, err := h.s.GetWithCategory(cat)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *DishHandler) List(c echo.Context) error {
	ds, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *DishHandler) Update(c echo.Context) error {
	var updateImage bool
	var extension string

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

	// If new base64 have sent
	if !strings.Contains(dbind.Picture, service.CloudFrontUrl) {
		updateImage = true

		dbind.Picture, extension, err = parseRawBase64(dbind.Picture)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
	}

	d, err := h.s.Update(dbind, updateImage, extension)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}
