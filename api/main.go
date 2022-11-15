package main

import (
	"os"

	"github.com/joho/godotenv"
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

	err := godotenv.Load("../.env")

	if err != nil {
		panic("Error loading .env file")
	}

	dsn := os.Getenv("DB_CONNECTION_STRING")
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
