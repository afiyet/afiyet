package service

import (
	_ "embed"
	"errors"
	"fmt"
	"net/smtp"
	"os"
	"strings"
)

type mail struct {
	Sender  string
	To      []string
	Subject string
	Body    string
}

//go:embed mail.html
var emailTemplate string

func SendGmailEmail(to, token string) error {
	appPassword := os.Getenv("GMAIL_APP_PASSWORD")
	if appPassword == "" {
		return errors.New("empty credential")
	}

	h := fmt.Sprintf(emailTemplate,
		"https://afiyet.site/change-password?token="+token,
		"https://afiyet.site/change-password?token="+token,
	)

	m := mail{
		Sender:  FromEmailAddress,
		To:      []string{to},
		Subject: "Afiyet Şifre Değişikliği Talebi",
		Body:    h,
	}
	msg := BuildMessage(m)
	auth := smtp.PlainAuth("", FromEmailAddress, appPassword, "smtp.gmail.com")
	err := smtp.SendMail("smtp.gmail.com:587", auth, FromEmailAddress, []string{to}, []byte(msg))

	if err != nil {
		return fmt.Errorf("gmail email send: %w", err)
	}

	return nil
}

func BuildMessage(m mail) string {
	msg := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\r\n"
	msg += fmt.Sprintf("From: %s\r\n", m.Sender)
	msg += fmt.Sprintf("To: %s\r\n", strings.Join(m.To, ";"))
	msg += fmt.Sprintf("Subject: %s\r\n", m.Subject)
	msg += fmt.Sprintf("\r\n%s\r\n", m.Body)

	return msg
}
