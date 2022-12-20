package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type TableRepository struct {
	GenericRepository[model.Table]
	db *gorm.DB
}

func NewTableRepository(db *gorm.DB) TableRepository {
	tr := TableRepository{
		GenericRepository: NewGenericRepository[model.Table](db),
		db:                db,
	}
	return tr
}

func (tr TableRepository) GetWithRestaurantId(id int) ([]model.Table, error) {
	var rs []model.Table
	err := tr.db.Where("restaurant_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}
