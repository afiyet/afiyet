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
	err := or.db.Preload("Dishes").Where("table_id = ? AND status <> ? AND status <> ?", id, "PAYMENT_FAILED", "IN_PROGRESS").Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (or OrderRepository) GetByRestaurantId(id int) ([]model.Order, error) {
	var rs []model.Order
	err := or.db.Preload("Dishes").Where("restaurant_id = ? AND status <> ? AND status <> ?", id, "PAYMENT_FAILED", "IN_PROGRESS").Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (or OrderRepository) GetByToken(token string) (*model.Order, error) {
	var rs model.Order
	err := or.db.Where("token = ?", token).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return &rs, nil
}

func (or OrderRepository) DeleteByTableId(id int) ([]model.Order, error) {

	var rs []model.Order
	err := or.db.Where("table_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	err = or.db.Delete(&model.Order{}, "table_id = ?", id).Error

	if err != nil {
		return nil, err
	}

	return rs, err
}
