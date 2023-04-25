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

func (lr LocationRepository) GetLocationList() (*[]model.LocationQuery, error) {

	var result []model.LocationQuery
	lr.db.Raw("select * from locations_with_ratings").Scan(&result)

	// if err != nil {
	// 	return nil, err
	// }

	return &result, nil
}

func (lr LocationRepository) GetLocationWithId(id int) (*model.LocationQuery, error) {

	var result model.LocationQuery
	lr.db.Raw("select * from locations_with_ratings where id = ?", id).Scan(&result)
	return &result, nil
}
