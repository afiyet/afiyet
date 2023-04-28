package service

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"strings"
)

type DishService struct {
	r   repo.DishRepository
	aws *AmazonService
}

func NewDishService(db *gorm.DB, aws *AmazonService) *DishService {
	return &DishService{r: repo.NewDishRepository(db), aws: aws}
}

func (s *DishService) Add(d model.Dish, hasImage bool, extension string) (*model.Dish, error) {
	if hasImage {
		s3key := getDishS3Key(d, extension)
		reader := strings.NewReader(d.Picture)

		err := s.aws.Upload(s3key, reader)
		if err != nil {
			return nil, fmt.Errorf("s3 upload: %w", err)
		}

		d.Picture = CloudFrontUrl + "/" + s3key
	}

	dish, err := s.r.Add(d)
	if err != nil {
		return nil, fmt.Errorf("db add: %w", err)
	}

	return dish, nil
}

func (s *DishService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *DishService) Get(id int) (*model.Dish, error) {
	return s.r.Get(id)
}

func (s *DishService) GetWithCategory(cat string) ([]model.Dish, error) {
	return s.r.GetWithCategory(cat)
}

func (s *DishService) List() ([]model.Dish, error) {
	return s.r.List()
}

func (s *DishService) Update(d model.Dish, updateImage bool, extension string) (*model.Dish, error) {
	if updateImage {
		s3key := getDishS3Key(d, extension)
		reader := strings.NewReader(d.Picture)

		err := s.aws.Upload(s3key, reader)
		if err != nil {
			return nil, fmt.Errorf("s3 upload: %w", err)
		}

		d.Picture = CloudFrontUrl + "/" + s3key
	}
	return s.r.Update(d)
}

func getDishS3Key(d model.Dish, extension string) string {
	return fmt.Sprintf("dish/%s-%s.%s", d.Name, uuid.NewString(), extension)
}
