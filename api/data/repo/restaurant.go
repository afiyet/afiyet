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

func (r RestaurantRepository) GetDishes(id int) ([]model.Dish, error) {
	var ds []model.Dish
	err := r.db.Where("restaurant = ?", id).Find(&ds).Error

	if err != nil {
		return nil, err
	}

	return ds, nil
}

func (rr RestaurantRepository) GetRatings(id int) ([]model.Rating, error) {
	var rs []model.Rating
	err := rr.db.Where("id=", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RestaurantRepository) GetRestaurantAverageRating(id int) (float64, error) {
	var avg float64
	row := rr.db.Table("ratings").Where("restaurant = ?", id).Select("avg(point)").Row()
	err := row.Scan(&avg)

	if err != nil {
		return 0, err
	}

	return avg, nil
}
