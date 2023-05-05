package service

import (
	"crypto/rand"
	"encoding/base64"
	"errors"
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
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

	token, err := generateRandomString(256)

	err = s.r.AddPasswordLog(pe, token)
	if err != nil {
		return err
	}

	err = SendGmailEmail(pe.Email, token)

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

// GenerateRandomString returns a URL-safe, base64 encoded
// securely generated random string.
func generateRandomString(s int) (string, error) {
	b, err := generateRandomBytes(s)
	return base64.URLEncoding.EncodeToString(b), err
}

// GenerateRandomBytes returns securely generated random bytes.
// It will return an error if the system's secure random
// number generator fails to function correctly, in which
// case the caller should not continue.
func generateRandomBytes(n int) ([]byte, error) {
	b := make([]byte, n)
	_, err := rand.Read(b)
	// Note that err == nil only if we read len(b) bytes.
	if err != nil {
		return nil, err
	}

	return b, nil
}
