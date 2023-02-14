package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type LocationRepository struct {
	GenericRepository[model.Restaurant]
	db *gorm.DB
}

func NewLocationRepository(db *gorm.DB) LocationRepository {
	dr := LocationRepository{
		GenericRepository: NewGenericRepository[model.Restaurant](db),
		db:                db,
	}
	return dr
}

func (lr LocationRepository) GetLocationList() ([]model.Restaurant, error) {
	var ds []model.Restaurant

	err := lr.db.Select("name","location").Find(&ds).Error

	if err != nil {
		return nil, err
	}

	return ds, nil
}