package service

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"io"
	"time"
)

const (
	maxRequestTime   = 5 * time.Second
	CloudFrontUrl    = "https://d33virtamuit9v.cloudfront.net"
	S3BucketName     = "afiyet-media"
	FromEmailAddress = "afiyetapp@gmail.com"
)

type AmazonService struct {
	s3 *s3.Client
}

func NewAmazonService() (*AmazonService, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-central-1"))
	if err != nil {
		return nil, fmt.Errorf("aws-config default package error: %w", err)
	}

	s3 := s3.NewFromConfig(cfg)

	return &AmazonService{
		s3: s3,
	}, nil
}

func (a AmazonService) S3UploadImage(name string, reader io.Reader, extension string) error {
	ctx, cancel := context.WithTimeout(context.Background(), maxRequestTime)
	defer cancel()

	_, err := a.s3.PutObject(ctx, &s3.PutObjectInput{
		Bucket:      aws.String(S3BucketName),
		Key:         &name,
		Body:        reader,
		ContentType: aws.String("image/" + extension),
	})

	if err != nil {
		return err
	}

	return nil
}
