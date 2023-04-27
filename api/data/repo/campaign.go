package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type CampaignRepository struct {
	GenericRepository[model.Campaign]
	db *gorm.DB
}

func NewCampaignRepository(db *gorm.DB) CampaignRepository {
	cr := CampaignRepository{
		GenericRepository: NewGenericRepository[model.Campaign](db),
		db:                db,
	}

	return cr
}
