package handlers

import (
	"github.com/afiyet/afiytet/api/service"
	"net/http"
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