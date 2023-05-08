package handlers

import (
	"net/http"
	"os"

	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"gorm.io/gorm"
)

func Bootstrap(db *gorm.DB, e *echo.Echo, sha string) error {
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
		s: service.NewRestaurantService(db, aws),
	}
	tableHandler := TableHandler{
		s: service.NewTableService(db),
	}
	orderHandler := OrderHandler{
		s: service.NewOrderService(db),
		o: service.NewOrderDishService(db),
	}
	locationHandler := LocationHandler{
		s: service.NewLocationService(db),
	}
	PaymentHandler := PaymentHandler{
		orderService:     orderHandler.s,
		userService:      userHandler.s,
		orderDishService: orderHandler.o,
	}

	PasswordHandler := PasswordHandler{
		s: service.NewPasswordService(db),
	}

	e.POST("/users/signup", userHandler.Signup)
	e.POST("/users/login", userHandler.Login)

	e.POST("/dishes", dishHandler.Add)
	e.DELETE("/dishes/:id", dishHandler.Delete)
	e.PUT("/dishes/:id", dishHandler.Update)

	e.POST("/ratings/:restaurantId/:userId", ratingHandler.Add)
	e.DELETE("/ratings/:ratingId", ratingHandler.Delete)

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
	e.DELETE("/restaurants/orders/:id", orderHandler.DeleteCascade)
	e.DELETE("/restaurants/tables/orders/:id", orderHandler.DeleteCascadeByTableId)

	e.GET("/restaurants/:id/tables", tableHandler.GetByRestaurant)
	e.POST("/restaurants/tables", tableHandler.Add)
	e.DELETE("/restaurants/tables/:id", tableHandler.Delete)
	e.PUT("/restaurants/tables/:id", tableHandler.Update)
	e.POST("/restaurants/tables/switch/:orderId/:toTableId", tableHandler.SwitchTable)
	e.POST("/restaurants/tables/emptyTable/:restId", tableHandler.IsEmptyTable)

	e.GET("/locations", locationHandler.GetLocationList)
	e.GET("/locations/:id", locationHandler.GetLocationWithId)

	e.POST("/restaurants/orderPayment", PaymentHandler.CreatePaymentWithForm)
	e.POST("/restaurants/setOrderResult", PaymentHandler.SetPaymentResult)
	e.POST("/restaurants/orderCallback", PaymentHandler.PaymentCallBackURL)
	e.POST("/restaurants/createCashOrder", PaymentHandler.CreateWithCashPayment)
	e.POST("/restaurants/completeCashPayment", PaymentHandler.CompleteCashPayment)
	e.POST("/restaurants/callWaiter", PaymentHandler.CallWaiterForCashPayment)
	e.POST("/restaurants/acceptCashPayment", PaymentHandler.AcceptCashPayment)

	e.POST("/password/forgotten/:email", PasswordHandler.ReqPasswordChange)
	e.POST("/password/change", PasswordHandler.ChangePassword)

	// Ops

	e.GET("/ping", func(c echo.Context) error {
		return c.String(http.StatusOK, "pong")
	})

	// authn
	g := e.Group("")
	g.Use(middleware.BasicAuth(func(username, password string, c echo.Context) (bool, error) {
		if username == os.Getenv("BASIC_AUTH_USERNAME") && password == os.Getenv("BASIC_AUTH_PASSWORD") {
			return true, nil
		}
		return false, nil
	}))

	g.GET("/sha", func(c echo.Context) error {
		return c.String(http.StatusOK, sha)
	})

	return nil
}
