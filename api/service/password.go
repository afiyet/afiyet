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
	valid, err := s.r.IsEmailValid(pe)

	if err != nil {
		return fmt.Errorf("email validatoin sql: %w", err)
	}

	if !valid {
		return errors.New("mail is not found")
	}

	seed := strconv.Itoa(int(time.Now().UnixNano()))
	// Create token
	tmp, err := bcrypt.GenerateFromPassword([]byte(seed), 4)
	token := string(tmp[:])

	err = s.r.AddPasswordLog(pe, token)
	if err != nil {
		return err
	}

	//err = SendGmailEmail(pe.Email, token)

	if err != nil {
		return err
	}

	return nil
}

func (s *PasswordService) ChangePassword(pe model.PasswordTemp) error {
	valid, err := s.r.ValidateToken(pe)

	if err != nil {
		return fmt.Errorf("validation sql: %w", err)
	}

	if valid {
		err := s.r.ChangePassword(pe)
		if err != nil {
			return fmt.Errorf("password change sql: %w", err)
		}
	} else {
		return errors.New("token is invalid")
	}

	return nil
}
