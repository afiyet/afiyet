package main

import (
	"errors"
	"github.com/labstack/echo/v4"
	"golang.org/x/exp/slices"
	"net/http"
)

type User struct {
	Name string `json:"name"`
	Id   string `json:"id"`
}

type UserRepository interface {
	Get(id string) (*User, error)
	Delete(id string) error
	List() ([]User, error)
}

type UserHandler struct {
	repo UserRepository
}

func (handler *UserHandler) Get(c echo.Context) error {
	id := c.Param("id")
	u, err := handler.repo.Get(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if u == nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, u)
}

func (handler *UserHandler) Delete(c echo.Context) error {
	id := c.Param("id")
	err := handler.repo.Delete(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "OK")
}

func (handler *UserHandler) List(c echo.Context) error {
	us, err := handler.repo.List()

	if err != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, us)
}

type MockRepository struct {
	users []User
}

func (m *MockRepository) Get(id string) (*User, error) {
	for _, v := range m.users {
		if v.Id == id {
			return &v, nil
		}
	}

	return nil, errors.New("not found")
}

func (m *MockRepository) Delete(id string) error {
	for i, v := range m.users {
		if v.Id == id {
			m.users = slices.Delete(m.users, i, i+1)
			return nil
		}
	}

	return errors.New("not found")
}

func (m *MockRepository) List() ([]User, error) {
	return m.users, nil
}
