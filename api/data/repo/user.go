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

func (ur UserRepository) GetUserLoginInfo(mail string) (*model.User, error) {

	var response model.User
	err := ur.db.Where("mail", mail).Find(&response).Error
	if err != nil {
		return &model.User{}, err
	}

	return &response, nil 
}