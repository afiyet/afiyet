package handlers

import (
	"encoding/base64"
	"errors"
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
	var extension string

	err := (&echo.DefaultBinder{}).BindBody(c, &dbind)
	if err != nil {
		return err
	}

	extension, err = getExtension(dbind.Picture)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	decoded, err := decodeBase64(dbind.Picture)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	dbind.Picture = decoded

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

		extension, err = getExtension(dbind.Picture)

		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}

		decoded, err := decodeBase64(dbind.Picture)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
		dbind.Picture = decoded
	}

	d, err := h.s.Update(dbind, updateImage, extension)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, d)
}

func decodeBase64(str string) (string, error) {
	if strings.Contains(str, ",") {
		str = str[strings.IndexByte(string(str), ',')+1:]
	}
	resp, err := base64.StdEncoding.DecodeString(str)

	if err != nil {
		return "", fmt.Errorf("base64 decode: %w", err)
	}

	return string(resp), nil
}

func getExtension(b64 string) (string, error) {
	start := strings.Index(b64, "/")
	end := strings.Index(b64, ";")

	if start == -1 || end == -1 {
		return "", errors.New("no / or ; in base64")
	}

	return b64[start+1 : end], nil
}
