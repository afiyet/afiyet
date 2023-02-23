package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	r repo.UserRepository
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{r: repo.NewUserRepository(db)}
}

func (s *UserService) Add(u model.User) (*model.User, error) {
	ret, err := s.r.Add(u)

	if err != nil {
		return nil, err
	}

	return ret, nil
}

func (s *UserService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *UserService) Get(id int) (*model.User, error) {
	return s.r.Get(id)
}

func (s *UserService) List() ([]model.User, error) {
	return s.r.List()
}

func (s *UserService) Update(u model.User) (*model.User, error) {
	return s.r.Update(u)
}

func (s *UserService) GetRatings(id int) ([]model.Rating, error) {
	return s.r.GetRatings(id)
}

func (s *UserService) Signup(u model.User) (*model.User, error) {

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(u.Password), 4)
	u.Password = string(hashedPassword[:])

	ret, err := s.r.Add(u)

	if err != nil {
		return nil, err
	}

	return ret, nil
}
