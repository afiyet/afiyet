package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type OrderDishService struct {
	r repo.OrderRepository
}

func NewOrderDishService(db *gorm.DB) *OrderDishService {
	return &OrderDishService{r: repo.NewOrderRepository(db)}
}

func (s *OrderDishService) Add(o model.Order) (*model.Order, error) {
	return s.r.Add(o)
}

func (s *OrderDishService) Get(id int) (*model.Order, error) {
	return s.r.Get(id)
}

func (s *OrderDishService) List() ([]model.Order, error) {
	return s.r.List()
}

func (s *OrderDishService) Delete(id int) error {
	return s.r.Delete(id)
}
