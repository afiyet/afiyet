package handlers

import (
	"fmt"
	"net/http"
	"strconv"
	"strings"

	"github.com/afiyet/afiytet/api/service"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/labstack/echo/v4"
)

type RestaurantHandler struct {
	s *service.RestaurantService
}

func (h *RestaurantHandler) Add(c echo.Context) error {
	var hasImage bool
	var extension string

	var rbind model.Restaurant
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if rbind.Picture != "" {
		hasImage = true
		rbind.Picture, extension, err = parseRawBase64(rbind.Picture)
		if err != nil {
			return err
		}
	}

	r, err := h.s.Add(rbind, hasImage, extension)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, r)
}

func (h *RestaurantHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.s.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Restaurant successfully Deleted")
}

func (h *RestaurantHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	res, err := h.s.Get(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}

func (h *RestaurantHandler) List(c echo.Context) error {

	rs, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RestaurantHandler) Update(c echo.Context) error {
	var updateImage bool
	var extension string

	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	var rbind model.Restaurant
	err = (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	rbind.ID = uint(id)

	// If new base64 have sent
	if !strings.Contains(rbind.Picture, service.CloudFrontUrl) || rbind.Picture != "" {
		updateImage = true

		rbind.Picture, extension, err = parseRawBase64(rbind.Picture)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
	}

	// TODO(umutgercek) change wen adding, password changing feature
	old, err := h.s.Get(id)
	if err != nil {
		err = fmt.Errorf("cannot get old restaurant: %w", err)
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	rbind.Password = old.Password

	r, err := h.s.Update(rbind, updateImage, extension)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, r)
}

func (h *RestaurantHandler) GetDishes(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	ds, err := h.s.GetDishes(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *RestaurantHandler) GetRatings(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	rs, err := h.s.GetRatings(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RestaurantHandler) GetOrders(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	rs, err := h.s.GetOrders(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RestaurantHandler) GetTables(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	rs, err := h.s.GetTables(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RestaurantHandler) GetRestaurantAverageRating(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	avg, err := h.s.GetRestaurantAverageRating(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, avg)
}

func (h *RestaurantHandler) Signup(c echo.Context) error {
	var rbind model.Restaurant
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	u, err := h.s.Signup(rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *RestaurantHandler) Login(c echo.Context) error {
	var rbind model.Restaurant
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	u, err := h.s.Login(rbind)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *RestaurantHandler) Search(c echo.Context) error {
	str := c.Param("str")

	rs, err := h.s.Search(str)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}
