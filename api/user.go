package main

import (
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model //has ID, CreatedAt, UpdatedAt, DeletedAt
	Name       string
	Surname    string
	mail       string
}

type UserRepository interface {
	Get(id string) (*User, error)
	Delete(id string) error
	List() ([]User, error)
}

func (handler *UserHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	//u, err := handler.repo.Get(id)
	handler.db.AutoMigrate(&User{})

	var user User

	result := handler.db.First(&user, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, user)
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

/* type MockRepository struct {
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
} */
