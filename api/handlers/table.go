package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/afiyet/afiytet/api/service"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/labstack/echo/v4"
)

type TableHandler struct {
	s *service.TableService
}

func (h *TableHandler) Add(c echo.Context) error {
	var rbind model.Table
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	r, err := h.s.Add(rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, r)
}

func (h *TableHandler) Get(c echo.Context) error {
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

func (h *TableHandler) List(c echo.Context) error {

	rs, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, rs)
}

func (h *TableHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var tbind model.Table

	err := (&echo.DefaultBinder{}).BindBody(c, &tbind)
	if err != nil {
		return err
	}

	tbind.ID = uint(id)
	t, err := h.s.Update(tbind)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, t)
}

func (h *TableHandler) Delete(c echo.Context) error {
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

func (h *TableHandler) GetOrders(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	ds, err := h.s.GetOrders(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *TableHandler) GetByRestaurant(c echo.Context) error {
	restId := c.Param("id")
	id, err := strconv.Atoi(restId)
	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", restId))
	}

	ds, err := h.s.GetByRestaurant(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}
