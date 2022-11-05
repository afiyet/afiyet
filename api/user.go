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
	Mail       string
}

type UserRepository interface {
	Get(id string) (*User, error)
	Delete(id string) error
	List() ([]User, error)
	Add(name string, surname string, mail string) error
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
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	handler.db.AutoMigrate(&User{})

	result := handler.db.Delete(&User{}, id)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	if result == nil {
		return c.JSON(http.StatusNotFound, "User not found")
	}

	return c.JSON(http.StatusOK, "User successfully Deleted")
}

func (handler *UserHandler) List(c echo.Context) error {

	var users []User

	result := handler.db.Find(&users)
	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, users)
}

func (handler *UserHandler) Add(c echo.Context) error {
	name := c.Param("name")
	surname := c.Param("surname")
	mail := c.Param("mail")

	handler.db.AutoMigrate(&User{})

	var user = User{Name: name, Surname: surname, Mail: mail}

	result := handler.db.Create(&user)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "User successfully added")
}

func (handler *UserHandler) Update(c echo.Context) error {
	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)
	name := c.Param("name")
	surname := c.Param("surname")
	mail := c.Param("mail")

	var user User

	handler.db.AutoMigrate(&User{})

	handler.db.First(&user, id)

	user.Name = name
	user.Surname = surname
	user.Mail = mail

	result := handler.db.Save(&user)

	if result.Error != nil {
		return c.JSON(http.StatusBadRequest, "DB error")
	}

	return c.JSON(http.StatusOK, "User successfully updated")
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
