package repo

import (
	"fmt"

	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type PasswordRepository struct {
	db *gorm.DB
}

func NewPasswordRepository(db *gorm.DB) PasswordRepository {
	pr := PasswordRepository{
		db: db,
	}

	return pr
}

func (pr PasswordRepository) EmailCheck(mail string) (bool, error) {
	var pc []model.PasswordChange
	err := pr.db.Where("email = ?", mail).First(&pc).Error

	if err != nil {
		fmt.Print(err)
		return false, err
	}

	return true, nil
}
