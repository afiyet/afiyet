package repo

import (
	"errors"
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"time"
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
	return pr.db.Exec(`
INSERT INTO password_changes (email, token, user_type, created_at)
VALUES(?,?,?,?);`,
		pe.Email, token, pe.UserType, time.Now()).Error
}

func (pr PasswordRepository) ValidateToken(pe model.PasswordTemp) (bool, error) {
	var result time.Time
	err := pr.db.Raw(`
select created_at from password_changes
pc where pc.token = ?
	and updated_at is null;
`,
		pe.Token).Scan(&result).Error

	if err != nil {
		return false, err
	}

	if time.Now().Before(result.Add(time.Hour * 12)) {
		return true, nil
	} else {
		return false, errors.New("passwd more than 12 hours")
	}
}

func (pr PasswordRepository) ChangePassword(pe model.PasswordTemp) error {
	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(pe.TempPassword), 4)
	passwordStr := string(hashedPassword[:])

	var tmp model.PasswordChange

	err := pr.db.Raw("select * from password_changes pc where pc.token = ?", pe.Token).Scan(&tmp).Error

	if err != nil {
		return err
	}

	if tmp.UserType == "restaurant" {
		err = pr.db.Exec("update restaurants set password = ? where mail = ? ", passwordStr, tmp.Email).Error

		if err != nil {
			return err
		}
	} else if tmp.UserType == "user" {
		err = pr.db.Exec("update users set password = ? where mail = ? ", passwordStr, tmp.Email).Error

		if err != nil {
			return err
		}
	}

	err = pr.db.Exec(`
update password_changes
set updated_at = ?
where token =?
`, time.Now(), pe.Token).Error

	if err != nil {
		return fmt.Errorf("update password's update time %#v", err)
	}

	return nil
}
