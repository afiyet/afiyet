package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type PasswordRepository struct {
	GenericRepository[model.PasswordChange]
	db *gorm.DB
}

func NewPasswordRepository(db *gorm.DB) PasswordRepository {
	pr := PasswordRepository{
		GenericRepository: NewGenericRepository[model.PasswordChange](db),
		db:                db,
	}

	return pr
}

func (pr PasswordRepository) IsEmailValid(pe model.PasswordChange) (bool, error) {
	var result string

	if pe.UserType == "restaurant" {
		err := pr.db.Raw("select 1 from restaurants r where r.mail = ?", pe.Email).Scan(&result).Error

		if err != nil {
			return false, err
		}
	} else if pe.UserType == "user" {
		err := pr.db.Raw("select 1 from users u where u.mail = ?", pe.Email).Scan(&result).Error

		if err != nil {
			return false, err
		}
	}

	if result == "1" {
		return true, nil
	}

	return false, nil
}

func (pr PasswordRepository) AddPasswordLog(pe model.PasswordChange, token string) error {
	return pr.db.Raw("INSERT INTO password (email, token, userType) VALUES(?,?,?);",
		pe.Email, token, pe.UserType).Error
}

func (pr PasswordRepository) ValidateToken(pe model.PasswordTemp) (bool, error) {
	var result string
	err := pr.db.Raw("select 1 from passwordChange pc where pc.token = ?", pe.Token).Scan(&result).Error

	if err != nil {
		return false, err
	}

	if result == "1" {
		return true, nil
	}

	return false, nil
}

func (pr PasswordRepository) ChangePassword(pe model.PasswordTemp) error {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(pe.TempPassword), 4)
	passwordStr := string(hashedPassword[:])

	var tmp model.PasswordChange

	err := pr.db.Raw("select * from passwordChange pc where pc.token = ?", pe.Token).Scan(&tmp).Error

	if err != nil {
		return err
	}

	if tmp.UserType == "restaurant" {
		err = pr.db.Raw("update restaurants set password = ? where mail = ? ", passwordStr, tmp.Email).Error

		if err != nil {
			return err
		}
	} else if tmp.UserType == "user" {
		err = pr.db.Raw("update users set password = ? where mail = ? ", passwordStr, tmp.Email).Error

		if err != nil {
			return err
		}
	}

	return nil
}
