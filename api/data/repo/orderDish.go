package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type OrderDishRepository struct {
	GenericRepository[model.OrderDish]
	db *gorm.DB
}

func NewOrderDishRepository(db *gorm.DB) OrderDishRepository {
	odr := OrderDishRepository{
		GenericRepository: NewGenericRepository[model.OrderDish](db),
		db:                db,
	}

	return odr
}

func (o *OrderDishRepository) DeleteByOrderID(id int) error {
	err := o.db.Delete(&model.OrderDish{}, "order_id = ?", id).Error
	if err != nil {
		return err
	}
	return nil
}
