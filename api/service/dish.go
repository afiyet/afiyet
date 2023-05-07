package service

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/google/uuid"
	"gorm.io/gorm"
)

type DishService struct {
	r   repo.DishRepository
	aws *AmazonService
}

func NewDishService(db *gorm.DB, aws *AmazonService) *DishService {
	return &DishService{r: repo.NewDishRepository(db), aws: aws}
}

func (s *DishService) Add(d model.Dish) (*model.Dish, error) {
	if shouldUploadImage(d.Picture) {
		url, err := uploadImage(s.aws, d.Picture, dishPicturePrefix(d))
		if err != nil {
			return nil, fmt.Errorf("dish picture add: %w", err)
		}
		d.Picture = url
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

func (s *DishService) Update(d model.Dish) (*model.Dish, error) {
	if shouldUploadImage(d.Picture) {
		prefix, err := getS3PrefixFromUrl(d.Picture)
		if err != nil {
			prefix = dishPicturePrefix(d)
		}

		url, err := uploadImage(s.aws, d.Picture, prefix)
		if err != nil {
			return nil, fmt.Errorf("dish picture update: %w", err)
		}

		d.Picture = url
	}

	return s.r.Update(d)
}

func dishPicturePrefix(d model.Dish) string {
	return fmt.Sprintf("dish/%s-%s", d.Name, uuid.NewString())
}
