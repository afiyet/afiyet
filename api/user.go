package main

import (
	"errors"
	"fmt"
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

var (
	UserNotFound = errors.New("user not found")
)

type UserRepository interface {
	Get(id string) (*User, error)
	Delete(id string) error
	List() ([]User, error)
	Add(User) error
}

func (handler *UserHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

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
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

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

type PostgresUserRepository struct {
	db *gorm.DB
}

func (p PostgresUserRepository) Get(id string) (*User, error) {
	err := p.db.AutoMigrate(&User{})

	if err != nil {
		return nil, err
	}

	var user User
	res := p.db.First(&user, id)

	if res == nil {
		return nil, UserNotFound
	}

	if res.Error != nil {
		return nil, res.Error // TODO(dbtofe) Inspect this error should we give to fe?
	}

	return &user, nil
}

func (p PostgresUserRepository) Delete(id string) error {
	err := p.db.AutoMigrate(&User{})

	if err != nil {
		return err // TODO(dbtofe)
	}

	result := p.db.Delete(&User{}, id)

	if result == nil {
		return UserNotFound
	}

	if result.Error != nil {
		return result.Error
	}

	return nil
}

func (p PostgresUserRepository) List() ([]User, error) {
	p.db.AutoMigrate(&User{})

	var users []User

	res := p.db.Find(&users)

	if res.Error != nil {
		return nil, res.Error // TODO(dbtofe)
	}

	return users, nil
}

func (p PostgresUserRepository) Add(u User) error {
	p.db.AutoMigrate(&User{})

	res := p.db.Create(&u)

	if res.Error != nil {
		return res.Error // TODO(dbtofe)
	}

	return nil
}

type MockUserRepository struct {
	m         map[string]User
	largestId int // Largest id
}

func (m MockUserRepository) Get(id string) (*User, error) {
	u, ok := m.m[id]

	if !ok {
		return nil, UserNotFound
	}

	return &u, nil
}

func (m MockUserRepository) Delete(id string) error {
	_, ok := m.m[id]

	if !ok {
		return UserNotFound
	}

	delete(m.m, id)

	return nil
}

func (m MockUserRepository) List() ([]User, error) {
	var users []User

	for _, v := range m.m {
		users = append(users, v)
	}

	return users, nil
}

func (m MockUserRepository) Add(u User) error {
	id := strconv.Itoa(m.largestId)
	m.m[id] = User{
		Name:    u.Name,
		Surname: u.Surname,
		Mail:    u.Mail,
	}

	m.largestId++

	return nil
}
