package service

import (
	"errors"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
	"strings"
)

type DishService struct {
	r repo.DishRepository
}

func NewDishService(db *gorm.DB) *DishService {
	return &DishService{r: repo.NewDishRepository(db)}
}

func (s *DishService) Add(d model.Dish) (*model.Dish, error) {
	if strings.Contains(d.Picture, "http") {
		return nil, errors.New("picture url should not contain protocol (http/https) give relative url")
	}

	return s.r.Add(d)
}

func (s *DishService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *DishService) Get(id int) (*model.Dish, error) {
	return s.r.Get(id)
}

func (s *DishService) GetWithCategory(cat string) ([]model.Dish, error) {
	return s.r.GetWithCategory(cat)
}

func (s *DishService) List() ([]model.Dish, error) {
	return s.r.List()
}

func (s *DishService) Update(d model.Dish) (*model.Dish, error) {
	return s.r.Update(d)
}
