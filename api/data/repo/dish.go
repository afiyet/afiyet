package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type DishRepository struct {
	GenericRepository[model.Dish]
	db *gorm.DB
}

func NewDishRepository(db *gorm.DB) DishRepository {
	dr := DishRepository{
		GenericRepository: NewGenericRepository[model.Dish](db),
		db:                db,
	}

	return dr
}

func (dr DishRepository) GetWithCategory(cat string) ([]model.Dish, error) {
	var ds []model.Dish
	err := dr.db.Where("category = ?", cat).Find(&ds).Error

	if err != nil {
		return nil, err
	}

	return ds, nil
}
