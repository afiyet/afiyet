package handlers

import (
	"net/http"

	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"gorm.io/gorm"
)

func Bootstrap(db *gorm.DB, e *echo.Echo) error {
	aws, err := service.NewAmazonService()
	if err != nil {
		return err
	}

	userHandler := UserHandler{
		s: service.NewUserService(db),
	}
	dishHandler := DishHandler{
		s: service.NewDishService(db, aws),
	}
	ratingHandler := RatingHandler{
		s: service.NewRatingService(db),
	}
	restaurantHandler := RestaurantHandler{
		s: service.NewRestaurantService(db),
	}
	tableHandler := TableHandler{
		s: service.NewTableService(db),
	}
	orderHandler := OrderHandler{
		s: service.NewOrderService(db),
	}
	locationHandler := LocationHandler{
		s: service.NewLocationService(db),
	}
	PaymentHandler := PaymentHandler{
		orderService: orderHandler.s,
		userService:  userHandler.s,
	}

	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	e.POST("/users", userHandler.Add)
	e.DELETE("/users/:id", userHandler.Delete)
	e.GET("/users/:id", userHandler.Get)
	e.GET("/users", userHandler.List)
	e.PUT("/users/:id", userHandler.Update)
	e.PUT("/users/:id/ratings", userHandler.GetRatings)

	e.POST("/users/signup", userHandler.Signup)
	e.POST("/users/login", userHandler.Login)

	e.POST("/dishes", dishHandler.Add)
	e.DELETE("/dishes/:id", dishHandler.Delete)
	e.GET("/dishes/:id", dishHandler.Get)
	e.GET("/dishes", dishHandler.List)
	e.PUT("/dishes/:id", dishHandler.Update)

	e.POST("/ratings/:restaurantId/:userId", ratingHandler.Add)
	e.DELETE("/ratings/:ratingId", ratingHandler.Delete)

	e.POST("/restaurants", restaurantHandler.Add)
	e.DELETE("/restaurants/:id", restaurantHandler.Delete)
	e.GET("/restaurants/:id", restaurantHandler.Get)
	e.GET("/restaurants", restaurantHandler.List)
	e.PUT("/restaurants/:id", restaurantHandler.Update)

	e.POST("/restaurants/signup", restaurantHandler.Signup)
	e.POST("/restaurants/login", restaurantHandler.Login)
	e.POST("/restaurant/search/:str", restaurantHandler.Search)

	e.GET("/restaurants/:id/dishes", restaurantHandler.GetDishes)

	e.GET("/restaurants/:id/ratings", restaurantHandler.GetRatings)
	e.GET("/restaurants/:id/ratings/get-average", restaurantHandler.GetRestaurantAverageRating)

	e.GET("/restaurants/:id/orders", orderHandler.GetByRestaurantId)
	e.POST("/restaurants/orders", orderHandler.Add)

	e.GET("/restaurants/:id/tables", tableHandler.GetByRestaurant)
	e.GET("/restaurants/tables/orders/:id", orderHandler.GetByTableID)
	e.POST("/restaurants/tables", tableHandler.Add)
	e.DELETE("/restaurants/tables/:id", tableHandler.Delete)
	e.PUT("/restaurants/tables/:id", tableHandler.Update)

	e.GET("/locations", locationHandler.GetLocationList)

	e.POST("/restaurants/orderPayment", PaymentHandler.CreatePaymentWithForm)
	e.POST("/restaurants/setOrderResult", PaymentHandler.SetPaymentResult)
	e.POST("/restaurants/orderCallback", PaymentHandler.PaymentCallBackURL)

	return nil
}
