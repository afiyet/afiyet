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

const maxRequestTime = 5 * time.Second
const CloudFrontUrl = "https://d33virtamuit9v.cloudfront.net"
const S3BucketName = "afiyet-media"

type AmazonService struct {
	s3 *s3.Client
}

func NewAmazonService() (*AmazonService, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-central-1"))
	if err != nil {
		return nil, fmt.Errorf("aws-config default package error: %w", err)
	}

	svc := s3.NewFromConfig(cfg)

	return &AmazonService{
		s3: svc,
	}, nil
}

func (a AmazonService) Upload(name string, reader io.Reader) error {
	ctx, cancel := context.WithTimeout(context.Background(), maxRequestTime)
	defer cancel()

	_, err := a.s3.PutObject(ctx, &s3.PutObjectInput{
		Bucket: aws.String(S3BucketName),
		Key:    &name,
		Body:   reader,
	})

	if err != nil {
		return err
	}

	return nil
}
