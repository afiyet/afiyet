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
