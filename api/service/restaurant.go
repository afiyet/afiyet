package service

import (
	"errors"
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
	"strings"
)

type RestaurantService struct {
	r   repo.RestaurantRepository
	aws *AmazonService
}

func NewRestaurantService(db *gorm.DB, aws *AmazonService) *RestaurantService {
	return &RestaurantService{
		r:   repo.NewRestaurantRepository(db),
		aws: aws,
	}
}

func (s *RestaurantService) Add(r model.Restaurant, hasImage bool, extension string) (*model.Restaurant, error) {
	if hasImage {
		s3key := getRestaurantS3Key(r, extension)
		reader := strings.NewReader(r.Picture)

		err := s.aws.Upload(s3key, reader)
		if err != nil {
			return nil, fmt.Errorf("s3 upload: %w", err)
		}

		r.Picture = CloudFrontUrl + "/" + s3key
	}

	return s.r.Add(r)
}

func (s *RestaurantService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *RestaurantService) Get(id int) (*model.Restaurant, error) {
	return s.r.Get(id)
}

func (s *RestaurantService) List() ([]model.Restaurant, error) {
	return s.r.List()
}

func (s *RestaurantService) Update(r model.Restaurant, updateImage bool, extension string) (*model.Restaurant, error) {
	if updateImage {
		s3key := getRestaurantS3Key(r, extension)
		reader := strings.NewReader(r.Picture)

		err := s.aws.Upload(s3key, reader)
		if err != nil {
			return nil, fmt.Errorf("s3 upload: %w", err)
		}

		r.Picture = CloudFrontUrl + "/" + s3key
	}
	return s.r.Update(r)
}

func (s *RestaurantService) GetDishes(id int) ([]model.Dish, error) {
	return s.r.GetDishes(id)
}

func (s *RestaurantService) GetRatings(id int) ([]model.Rating, error) {
	return s.r.GetRatings(id)
}

func (s *RestaurantService) GetOrders(id int) ([]model.Order, error) {
	return s.r.GetOrders(id)
}

func (s *RestaurantService) GetTables(id int) ([]model.Table, error) {
	return s.r.GetTables(id)
}

func (s *RestaurantService) GetRestaurantAverageRating(id int) (float64, error) {
	return s.r.GetRestaurantAverageRating(id)
}

func (s *RestaurantService) Signup(r model.Restaurant) (*model.Restaurant, error) {

	if r.Mail == "" || r.Password == "" {
		return nil, errors.New("Boş Değer")
	}
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(r.Password), 4)
	r.Password = string(hashedPassword[:])

	ret, err := s.r.Add(r)

	if err != nil {
		return nil, err
	}

	return ret, nil
}

func (s *RestaurantService) Login(r model.Restaurant) (*model.Restaurant, error) {
	var res *model.Restaurant
	res, err := s.r.GetRestaurantLoginInfo(r.Mail)
	if err != nil || res.Mail != r.Mail {
		return nil, errors.New("mail hatali")
	}

	if err = bcrypt.CompareHashAndPassword([]byte(res.Password), []byte(r.Password)); err != nil {
		return nil, err
	}

	return res, nil
}

func (s *RestaurantService) Search(str string) ([]model.LocationQuery, error) {
	return s.r.Search(str)
}

func getRestaurantS3Key(d model.Restaurant, extension string) string {
	return fmt.Sprintf("restaurant/%s-%s.%s", d.Name, uuid.NewString(), extension)
}
