package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type OrderDishService struct {
	r repo.OrderDishRepository
}

func NewOrderDishService(db *gorm.DB) *OrderDishService {
	return &OrderDishService{r: repo.NewOrderDishRepository(db)}
}

func (s *OrderDishService) Add(o model.OrderDish) (*model.OrderDish, error) {
	return s.r.Add(o)
}

func (s *OrderDishService) Get(id int) (*model.OrderDish, error) {
	return s.r.Get(id)
}

func (s *OrderDishService) List() ([]model.OrderDish, error) {
	return s.r.List()
}

func (s *OrderDishService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *OrderDishService) DeleteByOrderID(id int) error {
	return s.r.DeleteByOrderID(id)
}
