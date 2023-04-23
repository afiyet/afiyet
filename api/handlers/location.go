package handlers

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
)

type LocationHandler struct {
	s *service.LocationService
}

func (h *LocationHandler) GetLocationList(c echo.Context) error {

	ds, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, ds)
}

func (h *LocationHandler) GetLocationWithId(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	res, err := h.s.GetLocationWithId(id)
	if err != nil {
		return err
	}

	return c.JSON(http.StatusOK, res)
}
