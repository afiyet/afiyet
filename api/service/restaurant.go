package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type RestaurantService struct {
	r repo.RestaurantRepository
}

func NewRestaurantService(db *gorm.DB) *RestaurantService {
	return &RestaurantService{r: repo.NewRestaurantRepository(db)}
}

func (s *RestaurantService) Add(r model.Restaurant) (*model.Restaurant, error) {
	return s.r.Add(r)
}

func (s *RestaurantService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *RestaurantService) Get(id int) (*model.Restaurant, error) {
	return s.r.Get(id)
}

func (s *RestaurantService) List() ([]model.Restaurant, error) {
	return s.r.List()
}

func (s *RestaurantService) Update(r model.Restaurant) (*model.Restaurant, error) {
	return s.r.Update(r)
}

func (s *RestaurantService) GetDishes(id int) ([]model.Dish, error) {
	return s.r.GetDishes(id)
}

func (s *RestaurantService) GetRatings(id int) ([]model.Rating, error) {
	return s.r.GetRatings(id)
}

func (s *RestaurantService) GetOrders(id int) ([]model.Order, error) {
	return s.r.GetOrders(id)
}

func (s *RestaurantService) GetTables(id int) ([]model.Table, error) {
	return s.r.GetTables(id)
}

func (s *RestaurantService) GetRestaurantAverageRating(id int) (float64, error) {
	return s.r.GetRestaurantAverageRating(id)
}
