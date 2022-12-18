package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type RestaurantRepository struct {
	GenericRepository[model.Restaurant]
	db *gorm.DB
}

func NewRestaurantRepository(db *gorm.DB) RestaurantRepository {
	rr := RestaurantRepository{
		GenericRepository: NewGenericRepository[model.Restaurant](db),
		db:                db,
	}

	return rr
}
