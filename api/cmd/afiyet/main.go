package main

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/handlers"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

func main() {
	e := echo.New()

	err := godotenv.Load("../../../.env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	dsn := os.Getenv("DB_CONNECTION_STRING")
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to database")
	}

	model.MigrateAll(db)
	handlers.Bootstrap(db, e)

	e.Logger.Fatal(e.Start(":8080"))
}
