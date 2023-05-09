package handlers

import (
	"errors"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
	"unicode"
	"unicode/utf8"
)

var PasswordNotOk = errors.New("password does not match criteria")

type UserHandler struct {
	s *service.UserService
}

func (h *UserHandler) Signup(c echo.Context) error {
	var ubind model.User
	err := (&echo.DefaultBinder{}).BindBody(c, &ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	if !IsPasswordOk(ubind.Password) {
		return c.JSON(http.StatusBadRequest, PasswordNotOk)
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

func IsPasswordOk(password string) bool {
	var number, upper, lower, special bool
	for _, c := range []rune(password) {
		switch {
		case unicode.IsNumber(c):
			number = true
		case unicode.IsUpper(c):
			upper = true
		case unicode.IsLower(c):
			lower = true
		case unicode.IsPunct(c) || unicode.IsSymbol(c):
			special = true
		}
	}
	l := utf8.RuneCountInString(password)

	return number &&
		upper &&
		lower &&
		special &&
		l > 8 && l < 14
}
