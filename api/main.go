package main

import (
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()
	// Initialize DB and and create repository
	repo := &MockRepository{
		users: []User{
			{Name: "Baris", Id: "0"},
			{Name: "Oncum", Id: "1"},
			{Name: "Umut", Id: "2"},
			{Name: "UmutCil", Id: "3"},
			{Name: "UmutInce", Id: "4"},
		},
	}
	h := UserHandler{repo: repo}

	e.GET("/users", h.List)
	e.GET("/users/:id", h.Get)
	e.DELETE("/users/:id", h.Delete)
	e.Logger.Fatal(e.Start(":8080"))
}
