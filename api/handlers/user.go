package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type UserHandler struct {
	r repo.UserRepository
}

func (h *UserHandler) Add(c echo.Context) error {
	var ubind model.User
	err := (&echo.DefaultBinder{}).BindBody(c, &ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	u, err := h.r.Add(ubind)
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

func (h *UserHandler) List(c echo.Context) error {
	us, err := h.r.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, us)
}

func (h *UserHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var ubind model.User
	err := (&echo.DefaultBinder{}).BindBody(c, &ubind)
	if err != nil {
		return err
	}
	ubind.ID = uint(id)

	u, err := h.r.Update(ubind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *UserHandler) GetRatings(c echo.Context) error {
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
