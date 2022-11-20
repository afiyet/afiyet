package main

import (
	"log"
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
type RatingHandler struct {
	db *gorm.DB
}
type RestaurantHandler struct {
	repo RestaurantRepository
	db   *gorm.DB
}

func main() {
	e := echo.New()

	err := godotenv.Load("../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_CONNECTION_STRING")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	userHandler := UserHandler{db: db}
	dishHandler := DishHandler{db: db}
	ratingHandler := RatingHandler{db: db}
	restaurantHandler := RestaurantHandler{db: db}

	e.GET("/user", userHandler.List)
	e.GET("/user/:id", userHandler.Get)
	e.DELETE("/user/:id", userHandler.Delete)
	e.POST("/user/:name/:surname/:mail", userHandler.Add)
	e.PUT("/users/:id/:name/:surname/:mail", userHandler.Update)

	e.GET("/dish", dishHandler.List)
	e.GET("/dish/restaurant/:restaurantId", dishHandler.GetwithRestId)
	e.GET("/dish/:id", dishHandler.Get)
	e.GET("/dish/category/:category", dishHandler.GetwithCategory)
	e.DELETE("/dish/:id", dishHandler.Delete)
	e.POST("/dish/:restaurantId", dishHandler.Add) // ?name&category&ingredients&price
	e.PUT("/dish/:id", dishHandler.Update)         // ?name&category&ingredients&price

	e.GET("/rating/user/:id", ratingHandler.GetwithUser)
	e.GET("/rating/restaurant/:id", ratingHandler.GetwithRestourant)
	e.GET("/rating/average/:id", ratingHandler.GetRestaurantAverage)
	e.DELETE("/rating/:ratingId", ratingHandler.Delete)
	e.POST("/rating/:restaurantId/:userId", ratingHandler.Add) // ?comment&point

	e.GET("/restaurant", restaurantHandler.List)
	e.GET("/restaurant/:id", restaurantHandler.Get)
	e.DELETE("/restaurant/:id", restaurantHandler.Delete)
	e.POST("/restaurant/:name/:address/:category", restaurantHandler.Add)
	e.PUT("/restaurant/:id/:name/:address/:category", restaurantHandler.Update)

	e.Logger.Fatal(e.Start(":8080"))
}
