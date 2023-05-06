package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type OrderService struct {
	r repo.OrderRepository
}

func NewOrderService(db *gorm.DB) *OrderService {
	return &OrderService{r: repo.NewOrderRepository(db)}
}

func (s *OrderService) Add(o model.Order) (*model.Order, error) {
	return s.r.Add(o)
}

func (s *OrderService) Get(id int) (*model.Order, error) {
	return s.r.Get(id)
}

func (s *OrderService) Update(order model.Order) (*model.Order, error) {
	return s.r.Update(order)
}

func (s *OrderService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *OrderService) GetByRestaurantId(id int) ([]model.Order, error) {
	return s.r.GetByRestaurantId(id)
}

func (s *OrderService) GetByToken(token string) (*model.Order, error) {
	return s.r.GetByToken(token)
}

func (s *OrderService) DeleteByTableId(id int) ([]model.Order, error) {
	return s.r.DeleteByTableId(id)
}
