package handlers

import (
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Bootstrap(db *gorm.DB, e *echo.Echo) {
	uh := UserHandler{
		r: repo.NewUserRepository(db),
	}
	dh := DishHandler{
		r: repo.NewDishRepository(db),
	}
	rath := RatingHandler{
		r: repo.NewRatingRepository(db),
	}
	resh := RestaurantHandler{
		r: repo.NewRestaurantRepository(db),
	}

	e.GET("/user", uh.List)
	e.GET("/user/:id", uh.Get)
	e.DELETE("/user/:id", uh.Delete)
	e.POST("/user/:name/:surname/:mail", uh.Add)
	e.PUT("/users/:id/:name/:surname/:mail", uh.Update)

	e.GET("/dish", dh.List)
	e.GET("/dish/restaurant/:restaurantId", dh.GetWithRestaurantId)
	e.GET("/dish/:id", dh.Get)
	e.GET("/dish/category/:category", dh.GetWithCategory)
	e.DELETE("/dish/:id", dh.Delete)
	e.POST("/dish/:restaurantId", dh.Add) // ?name&category&ingredients&price
	e.PUT("/dish/:id", dh.Update)         // ?name&category&ingredients&price

	e.GET("/rating/user/:id", rath.GetWithUser)
	e.GET("/rating/restaurant/:id", rath.GetWithRestaurant)
	e.GET("/rating/average/:id", rath.GetRestaurantAverage)
	e.DELETE("/rating/:ratingId", rath.Delete)
	e.POST("/rating/:restaurantId/:userId", rath.Add) // ?comment&point

	e.GET("/restaurant", resh.List)
	e.GET("/restaurant/:id", resh.Get)
	e.DELETE("/restaurant/:id", resh.Delete)
	e.POST("/restaurant", resh.Add)       // ?name&address&category
	e.PUT("/restaurant/:id", resh.Update) //?name&address&category

}
