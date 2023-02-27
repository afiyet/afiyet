package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type LocationService struct {
	r repo.LocationRepository
}

func NewLocationService(db *gorm.DB) *LocationService {
	return &LocationService{r: repo.NewLocationRepository(db)}
}

func (s *LocationService) List() (*[]model.LocationQuery, error) {
	return s.r.GetLocationList()
}
