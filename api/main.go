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
type DishHandler struct {
	repo DishRepository
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

	userHandler := UserHandler{db: db}
	dishHandler := DishHandler{db: db}

	e.GET("/users", userHandler.List)
	e.GET("/users/:id", userHandler.Get)
	e.DELETE("/users/:id", userHandler.Delete)
	e.POST("/users/:name/:surname/:mail", userHandler.Add)
	e.PUT("/users/:id/:name/:surname/:mail", userHandler.Update)

	e.GET("/dish", dishHandler.List)
	e.GET("/dish/:restaurantId", dishHandler.GetwithRestId)
	e.GET("/dish/:id", dishHandler.Get)
	e.GET("/dish/:category", dishHandler.GetwithCategory)
	e.DELETE("/dish/:id", dishHandler.Delete)
	e.POST("/dish/:restaurantId", dishHandler.Add)       // ?name&category&ingredients&price
	e.PUT("/dish/:id/:restaurantId", dishHandler.Update) // ?name&category&ingredients&price

	e.Logger.Fatal(e.Start(":8080"))
}
