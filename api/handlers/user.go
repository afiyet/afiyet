package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
	"net/http"
	"strconv"
)

type UserHandler struct {
	r repo.UserRepository
}

func (h *UserHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	u, err := h.r.Get(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *UserHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.r.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, "User successfully Deleted")
}

func (h *UserHandler) List(c echo.Context) error {
	us, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, us)
}

func (h *UserHandler) Add(c echo.Context) error {
	name := c.Param("name")
	surname := c.Param("surname")
	mail := c.Param("mail")

	u, err := h.r.Add(model.User{Name: name, Surname: surname, Mail: mail})
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *UserHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)
	name := c.Param("name")
	surname := c.Param("surname")
	mail := c.Param("mail")

	u, err := h.r.Update(model.User{
		Model: gorm.Model{
			ID: uint(id),
		},
		Name:    name,
		Surname: surname,
		Mail:    mail,
		Rating:  nil,
	})
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}
