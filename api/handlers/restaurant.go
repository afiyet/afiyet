package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
)

type RestaurantHandler struct {
	r repo.RestaurantRepository
}

func (h *RestaurantHandler) Add(c echo.Context) error {
	var rbind model.Restaurant
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	r, err := h.r.Add(rbind)
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

	err = h.r.Delete(id)
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

	res, err := h.r.Get(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}

func (h *RestaurantHandler) List(c echo.Context) error {

	rs, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *RestaurantHandler) Update(c echo.Context) error {
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

	r, err := h.r.Update(rbind)
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

	ds, err := h.r.GetDishes(id)
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

	rs, err := h.r.GetRatings(id)

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

	rs, err := h.r.GetOrders(id)

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

	rs, err := h.r.GetTables(id)

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

	avg, err := h.r.GetRestaurantAverageRating(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, avg)
}
