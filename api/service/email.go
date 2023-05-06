package service

import (
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

func SendGmailEmail(to, token string) error {
	appPassword := os.Getenv("GMAIL_APP_PASSWORD")
	if appPassword == "" {
		return errors.New("empty credential")
	}

	h := fmt.Sprintf(`
	<h1> Afiyet Şifre Değişikliği Talebi </h1>

	<p>
	Eğer bu email sizin tarafınızdan atılmadıysa, dikakte almanıza gerek yoktur.
	Bu tür emailleri birden fazla alırsanız, lütfen afiyet.helpdesk@gmail.com'a bildiriniz.
	</p>

	<br>

	<a href="%s"> Şifrenizi değiştirmek için tıklayın </a> <br>
	`, "http://localhost:3000/change-password?token="+token) // TODO(umutgercek) move baseurl to cloud

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
