package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
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

func (cr CampaignRepository) PreloadedList() ([]model.Campaign, error) {
	var rs []model.Campaign
	err := cr.db.Preload("Restaurant").Preload(clause.Associations).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (cr CampaignRepository) PreloadedGet(id int) (*model.Campaign, error) {
	var c model.Campaign
	err := cr.db.Preload("Restaurant").Preload(clause.Associations).Where("restaurant_id", id).Find(&c).Error

	if err != nil {
		return nil, err
	}

	return &c, nil
}
