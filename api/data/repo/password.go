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

func (pr PasswordRepository) IsEmailValid(pe model.PasswordChange) bool {

	var result string

	if pe.UserType == "restaurant" {
		pr.db.Raw("select 1 from restaurants r where r.mail = ?", pe.Email).Scan(&result)
	} else if pe.UserType == "user" {
		pr.db.Raw("select 1 from users u where u.mail = ?", pe.Email).Scan(&result)
	}

	if result == "1" {
		return true
	}

	return false
}

func (pr PasswordRepository) AddPasswordLog(pe model.PasswordChange, token string) error {
	err := pr.db.Raw("INSERT INTO password (email, token, userType) VALUES(?,?,?);", pe.Email, token, pe.UserType).Error

	if err != nil {
		return err
	}

}

func (pr PasswordRepository) ValidateToken(pe model.PasswordTemp) bool {
	var result string
	pr.db.Raw("select 1 from passwordChange pc where pc.token = ?", pe.Token).Scan(&result)

	if result == "1" {
		return true
	}

	return false
}

func (pr PasswordRepository) ChangePassword(pe model.PasswordTemp) {

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(pe.TempPassword), 4)
	passwordStr := string(hashedPassword[:])

	var tmp model.PasswordChange

	pr.db.Raw("select * from passwordChange pc where pc.token = ?", pe.Token).Scan(&tmp)

	if tmp.UserType == "restaurant" {
		pr.db.Raw("update restaurants set password = ? where mail = ? ", passwordStr, tmp.Email)
	} else if tmp.UserType == "user" {
		pr.db.Raw("update users set password = ? where mail = ? ", passwordStr, tmp.Email)
	}
}
