package handlers

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
)

type UserHandler struct {
	s *service.UserService
}

func (h *UserHandler) Signup(c echo.Context) error {
	var ubind model.User
	err := (&echo.DefaultBinder{}).BindBody(c, &ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	u, err := h.s.Signup(ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *UserHandler) Login(c echo.Context) error {
	var ubind model.User
	err := (&echo.DefaultBinder{}).BindBody(c, &ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	u, err := h.s.Login(ubind)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}
