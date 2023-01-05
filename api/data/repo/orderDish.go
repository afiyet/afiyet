package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type OrderDishRepository struct {
	GenericRepository[model.Dish]
	db *gorm.DB
}

func NewOrderDishRepository(db *gorm.DB) OrderDishRepository {
	odr := OrderDishRepository{
		GenericRepository: NewGenericRepository[model.Dish](db),
		db:                db,
	}

	return odr
}
