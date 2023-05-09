package service

import (
	"errors"
	"fmt"

	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
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

func (s *RestaurantService) Get(id int) (*model.Restaurant, error) {
	return s.r.Get(id)
}

func (s *RestaurantService) List() ([]model.Restaurant, error) {
	return s.r.List()
}

func (s *RestaurantService) Update(r model.Restaurant) (*model.Restaurant, error) {
	if shouldUploadImage(r.Picture) {
		prefix, err := getS3PrefixFromUrl(r.Picture)
		if err != nil {
			prefix = restaurantPicturePrefix(r)
		}

		url, err := uploadImage(s.aws, r.Picture, prefix)
		if err != nil {
			return nil, fmt.Errorf("restaurant picture update: %w", err)
		}

		r.Picture = url
	}

	if shouldUploadImage(r.CampaignPicture) {
		prefix, err := getS3PrefixFromUrl(r.CampaignPicture)
		if err != nil {
			prefix = campaignPicturePrefix(r)
		}

		url, err := uploadImage(s.aws, r.CampaignPicture, prefix)
		if err != nil {
			return nil, fmt.Errorf("campaign picture update: %w", err)
		}

		r.CampaignPicture = url
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
		return nil, errors.New("empty mail or password")
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(r.Password), 4)
	r.Password = string(hashedPassword[:])

	if shouldUploadImage(r.Picture) {
		url, err := uploadImage(s.aws, r.Picture, restaurantPicturePrefix(r))
		if err != nil {
			return nil, fmt.Errorf("restaurant picture add: %w", err)
		}
		r.Picture = url
	}

	if shouldUploadImage(r.CampaignPicture) {
		url, err := uploadImage(s.aws, r.CampaignPicture, campaignPicturePrefix(r))
		if err != nil {
			return nil, fmt.Errorf("campaign picture add: %w", err)
		}
		r.CampaignPicture = url

	}

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

func restaurantPicturePrefix(res model.Restaurant) string {
	return fmt.Sprintf("restaurant/%s-%s", res.Name, uuid.NewString())
}

func campaignPicturePrefix(res model.Restaurant) string {
	return fmt.Sprintf("campaign/%s-%s", res.Name, uuid.NewString())
}

func (s *RestaurantService) GetEmptyTableId(id int) (int, error) {
	return s.r.GetEmptyTableId(id)
}
