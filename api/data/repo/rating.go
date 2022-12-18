package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type RatingRepository struct {
	GenericRepository[model.Rating]
	db *gorm.DB
}

func NewRatingRepository(db *gorm.DB) RatingRepository {
	rr := RatingRepository{
		GenericRepository: NewGenericRepository[model.Rating](db),
		db:                db,
	}

	return rr
}

func (rr RatingRepository) GetWithUserId(id int) ([]model.Rating, error) {
	var rs []model.Rating
	err := rr.db.Where("user_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RatingRepository) GetWithRestaurantId(id int) ([]model.Rating, error) {
	var rs []model.Rating
	err := rr.db.Where("restaurant = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RatingRepository) GetWithAverage(id int) (float64, error) {
	var avg float64
	row := rr.db.Table("ratings").Where("restaurant = ?", id).Select("avg(point)").Row()
	err := row.Scan(&avg)

	if err != nil {
		return 0, err
	}

	return avg, nil
}
