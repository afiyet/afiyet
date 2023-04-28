package service

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/data/repo"
	"github.com/google/uuid"
	"gorm.io/gorm"
	"strings"
)

type CampaignService struct {
	r   repo.CampaignRepository
	aws *AmazonService
}

func NewCampaignService(db *gorm.DB, aws *AmazonService) CampaignService {
	return CampaignService{
		r:   repo.NewCampaignRepository(db),
		aws: aws,
	}
}

func (s *CampaignService) Add(c model.Campaign, extension string) (*model.Campaign, error) {
	s3key := getCampaignS3Key(extension)
	reader := strings.NewReader(c.Picture)

	err := s.aws.Upload(s3key, reader)
	if err != nil {
		return nil, fmt.Errorf("s3 upload: %w", err)
	}

	c.Picture = CloudFrontUrl + "/" + s3key

	ret, err := s.r.Add(c)

	if err != nil {
		return nil, fmt.Errorf("db add: %w", err)
	}

	return ret, nil
}

func (s *CampaignService) Update(c model.Campaign, updateImage bool, extension string) (*model.Campaign, error) {
	if updateImage {
		s3key := getCampaignS3Key(extension)
		reader := strings.NewReader(c.Picture)

		err := s.aws.Upload(s3key, reader)
		if err != nil {
			return nil, fmt.Errorf("s3 upload: %w", err)
		}

		c.Picture = CloudFrontUrl + "/" + s3key
	}
	return s.r.Update(c)
}

func (s *CampaignService) Delete(id int) error {
	return s.r.Delete(id)
}

func (s *CampaignService) Get(id int) (*model.Campaign, error) {
	return s.r.PreloadedGet(id)
}

func (s *CampaignService) List() ([]model.Campaign, error) {
	return s.r.PreloadedList()
}

func getCampaignS3Key(extension string) string {
	return fmt.Sprintf("campaign/%s.%s", uuid.NewString(), extension)
}
