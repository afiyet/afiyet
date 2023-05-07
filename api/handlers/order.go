package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/afiyet/afiytet/api/service"

	"github.com/labstack/echo/v4"
)

type OrderHandler struct {
	s *service.OrderService
	o *service.OrderDishService
}

func (h *OrderHandler) DeleteCascade(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.s.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err = h.o.DeleteByOrderID(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Order successfully Deleted")
}

func (h *OrderHandler) DeleteCascadeByTableId(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	orders, err := h.s.DeleteByTableId(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	for i := 0; i < len(orders); i++ {
		err = h.o.DeleteByOrderID(int(orders[i].ID))
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
	}

	return c.JSON(http.StatusOK, "Order successfully Deleted")
}

func (h *OrderHandler) GetByRestaurantId(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	res, err := h.s.GetByRestaurantId(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}
