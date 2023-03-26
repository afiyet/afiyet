package main

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/handlers"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"log"
	"os"
)

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connstr := os.Getenv("DB_CONNECTION_STRING")

	app, err := NewApp(connstr)

	if err != nil {
		log.Fatal(err)
	}

	p := os.Getenv("APP_PORT")
	if p == "" {
		p = "8000"
	}
	app.e.Logger.Fatal(app.e.Start(":" + p))
}

type App struct {
	e  *echo.Echo
	db *gorm.DB
}

func NewApp(connstr string) (*App, error) {
	db, err := gorm.Open(postgres.Open(connstr), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	if err = model.MigrateAll(db); err != nil {
		return nil, err
	}

	e := echo.New()
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
	}))

	handlers.Bootstrap(db, e)

	return &App{
		e:  e,
		db: db,
	}, nil
}
