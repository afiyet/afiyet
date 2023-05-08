package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type TableService struct {
	r repo.TableRepository
}

func NewTableService(db *gorm.DB) *TableService {
	return &TableService{r: repo.NewTableRepository(db)}
}

func (s *TableService) Add(t model.Table) (*model.Table, error) {
	return s.r.Add(t)
}

func (s *TableService) Update(t model.Table) (*model.Table, error) {
	return s.r.Update(t)
}

func (s *TableService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *TableService) GetByRestaurant(id int) ([]model.Table, error) {
	return s.r.GetWithRestaurantId(id)
}
