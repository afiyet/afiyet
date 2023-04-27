package handlers

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
