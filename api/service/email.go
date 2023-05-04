package service

import (
	"fmt"
	"net/smtp"
	"os"
)

var appPassword string

func init() {
	appPassword = os.Getenv("GMAIL_APP_PASSWORD")
}

func SendGmailEmail(to, subject, body string) error {
	msg := fmt.Sprintf(`From: %s
To: %s
Subject: %s

%s
`, FromEmailAddress, to, subject, body)

	err := smtp.SendMail("smtp.gmail.com:587",
		smtp.PlainAuth("", FromEmailAddress, appPassword, "smtp.gmail.com"),
		FromEmailAddress, []string{to}, []byte(msg))

	if err != nil {
		return err
	}

	return nil
}
