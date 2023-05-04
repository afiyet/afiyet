package service

import (
	"errors"
	"fmt"
	"strconv"
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

func (s *PasswordService) ReqPasswordChange(pe model.PasswordChange) error {
	fmt.Printf("%#v", pe)
	if s.r.IsEmailValid(pe) {

		seed := strconv.Itoa(int(time.Now().UnixNano()))
		// Create token
		tmp, err := bcrypt.GenerateFromPassword([]byte(seed), 4)
		token := string(tmp[:])

		s.r.AddPasswordLog(pe, token)

		err = SendGmailEmail(pe.Email, token)

		if err != nil {
			return err
		}
	} else {
		return errors.New("Mail is not found")
	}

	return nil
}

func (s *PasswordService) ChangePassword(pe model.PasswordTemp) error {

	if s.r.ValidateToken(pe) {
		s.r.ChangePassword(pe)
	} else {
		return errors.New("Token is invalid")
	}

	return nil
}

// r, err := http.NewRequest("POST", posturl, bytes.NewBuffer(body))
// 		if err != nil {
// 			panic(err)
// 		}
