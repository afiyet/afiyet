package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type OrderRepository struct {
	GenericRepository[model.Order]
	db *gorm.DB
}

func NewOrderRepository(db *gorm.DB) OrderRepository {
	or := OrderRepository{
		GenericRepository: NewGenericRepository[model.Order](db),
		db:                db,
	}
	return or
}

func (or OrderRepository) GetByTableID(id int) ([]model.Order, error) {
	var rs []model.Order
	err := or.db.Where("table_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (or OrderRepository) GetByRestaurantId(id int) ([]model.Order, error) {
	var rs []model.Order
	err := or.db.Where("restaurant_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}
