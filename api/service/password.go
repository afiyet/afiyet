package service

import (
	"encoding/json"
	"errors"
	"fmt"
	"time"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type PasswordService struct {
	r repo.PasswordRepository
}

func NewPasswordService(db *gorm.DB) *PasswordService {
	return &PasswordService{r: repo.NewPasswordRepository(db)}
}

func (h *PasswordService) PostToMailService(r model.PasswordChange) (*model.PasswordChange, error) {
	IsAvaliable, err := h.r.EmailCheck(r.Email)
	if err != nil {
		return nil, errors.New("Email is not in use")
	}

	if IsAvaliable {
		token := h.RandomToken()

		m := make(map[string]string)
		m["email"] = r.Email
		m["token"] = token

		jsonStr, err := json.Marshal(m)

		if err != nil {
			return nil, err
		}

		h.SendToAws(jsonStr)
	}

}

func (h *PasswordService) RandomToken() string {
	seed, err := time.Now().MarshalBinary()
	if err != nil {
		return "HATA"
	}

	token, err := bcrypt.GenerateFromPassword(seed, 4)
	tokenStr := string(token[:])

	return tokenStr

}

func (h *PasswordService) SendToAws(obj string) (bool, error) {

	//AWS SERVICE(obj)

	if err != nil {
		fmt.Print(err)
		return false, err
	}

	return true, nil
}

func (h *PasswordService) ChangePassword(r model.PasswordChange) (*model.PasswordChange, error) {
	db.Model(&User{}).Where("active = ?", true).Update("name", "hello")

	db.PasswordChange.Where("token = ?", r.Token).Update("pass")

		if err != nil {
			return nil, err
		}	
	}

}