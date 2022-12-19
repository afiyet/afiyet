package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type UserRepository struct {
	GenericRepository[model.User]
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) UserRepository {
	ur := UserRepository{
		GenericRepository: NewGenericRepository[model.User](db),
		db:                db,
	}

	return ur
}

func (ur UserRepository) GetRatings(id int) ([]model.Rating, error) {
	var rs []model.Rating
	err := ur.db.Where("id=", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}
