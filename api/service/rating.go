package service

import (
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"gorm.io/gorm"
)

type RatingService struct {
	r repo.RatingRepository
}

func NewRatingService(db *gorm.DB) *RatingService {
	return &RatingService{r: repo.NewRatingRepository(db)}
}

func (h *RatingService) Add(r model.Rating) (*model.Rating, error) {
	return h.r.Add(r)
}

func (h *RatingService) Delete(id int) error {
	return h.r.Delete(id)
}
