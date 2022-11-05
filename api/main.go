package main

import (
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

type UserHandler struct {
	repo UserRepository
	db   *gorm.DB
}

func main() {
	e := echo.New()
	// Initialize DB and and create repository
	/* repo := &MockRepository{
		users: []User{
			{Name: "Baris", Id: "0"},
			{Name: "Oncum", Id: "1"},
			{Name: "Umut", Id: "2"},
			{Name: "UmutCil", Id: "3"},
			{Name: "UmutInce", Id: "4"},
		},
	} */

	dsn := "host=lucky.db.elephantsql.com user=bwsqlljo password=L7UUGrUyswJiU8Cm8lK9LA9JTGbeoOrl dbname=bwsqlljo port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Failed to connect to database")
	}

	h := UserHandler{db: db}

	e.GET("/users", h.List)
	e.GET("/users/:id", h.Get)
	e.DELETE("/users/:id", h.Delete)
	e.POST("/users/:name/:surname/:mail", h.Add)
	e.PUT("/users/:id/:name/:surname/:mail", h.Update)
	e.Logger.Fatal(e.Start(":8080"))
}
