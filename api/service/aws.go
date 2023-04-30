package service

import (
	"context"
	"fmt"
	"github.com/aws/aws-sdk-go-v2/aws"
	"github.com/aws/aws-sdk-go-v2/config"
	"github.com/aws/aws-sdk-go-v2/service/s3"
	"github.com/aws/aws-sdk-go-v2/service/sesv2"
	sesv2types "github.com/aws/aws-sdk-go-v2/service/sesv2/types"
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
	s3    *s3.Client
	sesv2 *sesv2.Client
}

func NewAmazonService() (*AmazonService, error) {
	cfg, err := config.LoadDefaultConfig(context.TODO(), config.WithRegion("eu-central-1"))
	if err != nil {
		return nil, fmt.Errorf("aws-config default package error: %w", err)
	}

	s3 := s3.NewFromConfig(cfg)
	sv2 := sesv2.NewFromConfig(cfg)

	return &AmazonService{
		s3:    s3,
		sesv2: sv2,
	}, nil
}

func (a AmazonService) S3Upload(name string, reader io.Reader) error {
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

func (a AmazonService) SendEmail(to, subject, body, bodyPlainText string) error {
	ctx, cancel := context.WithTimeout(context.Background(), maxRequestTime)
	defer cancel()

	_, err := a.sesv2.SendEmail(ctx, &sesv2.SendEmailInput{
		Content: &sesv2types.EmailContent{
			Simple: &sesv2types.Message{
				Body: &sesv2types.Body{
					Html: &sesv2types.Content{
						Data: &body,
					},
					Text: &sesv2types.Content{
						Data: &bodyPlainText,
					},
				},
				Subject: &sesv2types.Content{
					Data: &subject,
				},
			},
		},
		Destination: &sesv2types.Destination{
			ToAddresses: []string{to},
		},
		FromEmailAddress: aws.String(FromEmailAddress),
	})

	if err != nil {
		return err
	}

	return nil
}
