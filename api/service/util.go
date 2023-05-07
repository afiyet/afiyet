package service

import (
	"encoding/base64"
	"errors"
	"fmt"
	"strings"
)

func parseRawBase64(str string) (b64, extension string, err error) {
	decodeBase64 := func(str string) (string, error) {
		if strings.Contains(str, ",") {
			str = str[strings.IndexByte(string(str), ',')+1:]
		}
		resp, err := base64.StdEncoding.DecodeString(str)

		if err != nil {
			return "", fmt.Errorf("base64 decode: %w", err)
		}

		return string(resp), nil
	}

	getExtension := func(b64 string) (string, error) {
		start := strings.Index(b64, "/")
		end := strings.Index(b64, ";")

		if start == -1 || end == -1 {
			return "", errors.New("no / or ; in base64")
		}

		return b64[start+1 : end], nil
	}

	extension, err = getExtension(str)
	if err != nil {
		return "", "", err
	}

	b64, err = decodeBase64(str)

	if err != nil {
		return "", "", err
	}

	return b64, extension, err
}

func shouldUploadImage(str string) bool {
	if str == "" || strings.Contains(str, CloudFrontUrl) {
		return false
	}

	return true
}

func uploadImage(aws *AmazonService, rawb64 string, keyPrefix string) (pictureUrl string, err error) {
	b64, extension, err := parseRawBase64(rawb64)
	if err != nil {
		return "", fmt.Errorf("parse raw base64: %w", err)
	}

	s3key := keyPrefix + "." + extension
	reader := strings.NewReader(b64)

	err = aws.S3UploadImage(s3key, reader, extension)
	if err != nil {
		return "", fmt.Errorf("s3 upload: %w", err)
	}

	return CloudFrontUrl + "/" + s3key, nil
}

// https://d33virtamuit9v.cloudfront.net/dish/adana-abc-def.jpeg -> dish/adana-abc-def
func getS3PrefixFromUrl(url string) (string, error) {
	if !strings.HasPrefix(url, CloudFrontUrl+"/") {
		return "", errors.New("no cloudfront url")
	}

	if !strings.Contains(url, ".") {
		return "", errors.New("no extension")
	}

	start := len(CloudFrontUrl + "/")
	end := strings.Index(url, ".")

	return url[start:end], nil
}
