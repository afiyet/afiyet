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
	th := TableHandler{
		r: repo.NewTableRepository(db),
	}
	oh := OrderHandler{
		r: repo.NewOrderRepository(db),
	}

	e.POST("/users", uh.Add)
	e.DELETE("/users/:id", uh.Delete)
	e.GET("/users/:id", uh.Get)
	e.GET("/users", uh.List)
	e.PUT("/users/:id", uh.Update)
	e.PUT("/users/:id/ratings", uh.GetRatings)

	e.POST("/dishes", dh.Add)
	e.DELETE("/dishes/:id", dh.Delete)
	e.GET("/dishes/:id", dh.Get)
	e.GET("/dishes", dh.List)
	e.PUT("/dishes/:id", dh.Update)

	e.POST("/ratings/:restaurantId/:userId", rath.Add)
	e.DELETE("/ratings/:ratingId", rath.Delete)

	e.POST("/restaurants", resh.Add)
	e.DELETE("/restaurants/:id", resh.Delete)
	e.GET("/restaurants/:id", resh.Get)
	e.GET("/restaurants/:id/dishes", resh.GetDishes)
	e.GET("/restaurants/:id/orders", oh.GetByRestaurantId)
	e.POST("/restaurants/orders", oh.Add)
	e.GET("/restaurants/:id/tables", th.List)
	e.GET("/restaurants/tables/orders/:id", oh.GetByTableID)
	e.POST("/restaurants/tables", th.Add)
	e.GET("/restaurants/:id/ratings", resh.GetRatings)
	e.GET("/restaurants/:id/ratings/get-average", resh.GetRestaurantAverageRating)
	e.GET("/restaurants", resh.List)
	e.PUT("/restaurants/:id", resh.Update)

}
