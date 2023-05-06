package handlers

import (
	"net/http"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
)

type PasswordHandler struct {
	s *service.PasswordService
}

func (h *PasswordHandler) ReqPasswordChange(c echo.Context) error {
	userType := c.QueryParam("type")
	email := c.Param("email")

	if userType == "" {
		return c.JSON(http.StatusBadRequest, "type query parameter (?x=y) is not given ('restaurant' | 'user')")
	}

	if email == "" {
		return c.JSON(http.StatusBadRequest, "no email url parameter is given")
	}

	pc := model.PasswordChange{
		UserType: userType,
		Email:    email,
	}

	err := h.s.ReqPasswordChange(pc)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Success :)")
}

func (h *PasswordHandler) ChangePassword(c echo.Context) error {
	var rbind model.PasswordTemp
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	err = h.s.ChangePassword(rbind)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Success :)")
}
