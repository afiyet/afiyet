package main

import (
	"bytes"
	"database/sql"
	_ "embed"
	"fmt"
	wkhtml "github.com/SebastiaanKlippert/go-wkhtmltopdf"
	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
	"html/template"
	"log"
	"os"
	"strings"
	"sync"
	"time"
)

type Payment struct {
	PType string
	Count float64
}

type Dish struct {
	Name  string
	Sum   float64
	Count int
}

type Report struct {
	Date           string
	RestaurantName string
	Dishes         []Dish
	Payments       []Payment
	TotalSum       float64
}

type Restaurant struct {
	Id    string
	Email string
	pdf   string
	Name  string
}

//go:embed report.html
var htmlTemplate string

var dateString string

func init() {
	year, month, day := time.Now().Date()
	dateString = fmt.Sprintf("%d-%d-%d", day, month, year)

}

func main() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	connstr := os.Getenv("DB_CONNECTION_STRING")

	if connstr == "" {
		log.Fatal("DB_CONNECTION_STRING env variable")
	}

	if !strings.Contains(connstr, "default_transaction_read_only=true") {
		log.Fatal("Must enable read only in connection string (default_transaction_read_only=true)")
	}

	db, err := sql.Open("postgres", connstr)

	_, err = db.Exec("SET TIME ZONE 'Asia/Istanbul';")
	if err != nil {
		log.Fatal("Cannot execute set timezone")
	}

	restaurants, err := getRestaurants(db)

	if err != nil {
		log.Fatal("getRestaurants: %w", err)
	}

	emailCh := make(chan Restaurant, 1)
	var wg sync.WaitGroup

	for _, r := range restaurants {
		wg.Add(1)
		go func(r Restaurant) {
			defer wg.Done()
			report, err := generateReport(db, r)
			if err != nil {
				fmt.Printf("cannot send to %s: %s", r.Email, err.Error())
				r.Email = "bos"
				emailCh <- r
				return
			}
			r.pdf = report
			emailCh <- r
		}(r)
	}

	wg.Add(1)

	go func() {
		defer wg.Done()
		emailWorker(emailCh, len(restaurants))
	}()

	wg.Wait()
}

func getPayments(db *sql.DB, restaurantId string) ([]Payment, error) {
	rows, err := db.Query(`
select payment_type ,
       Count(*)
from orders
where now() - orders.created_at <= interval '24 hour'
	and orders.restaurant_id = $1
	and ( (payment_type = 'CARD' and is_completed = 1) or 
    	(payment_type = 'CASH' and is_completed = 1 and is_paid = 1)
		)
group by payment_type;
`, restaurantId)

	if err != nil {
		return nil, fmt.Errorf("sql query: %w", err)
	}

	defer rows.Close()

	var ps []Payment
	for rows.Next() {
		var p Payment

		if err = rows.Scan(&p.PType, &p.Count); err != nil {
			return nil, fmt.Errorf("row scan: %w", err)
		}

		//TODO spagetti show
		if p.PType == "CASH" {
			p.PType = "Nakit"
		} else if p.PType == "CARD" {
			p.PType = "Kart"
		}

		ps = append(ps, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("all rows error (rows.Err): %w", err)
	}

	return ps, nil
}

func getDishes(db *sql.DB, restaurantId string) ([]Dish, error) {
	rows, err := db.Query(`
select
    dishes.Name,
    sum(price),
    count(*)
from order_dishes
    join dishes on dishes.id = order_dishes.dish_id
	join orders on orders.id = order_dishes.order_id
where now() - order_dishes.created_at <= interval '24 hour'
	and orders.restaurant_id = $1
	and (
		(payment_type = 'CARD' and is_completed = 1) or 
    	(payment_type = 'CASH' and is_completed = 1 and is_paid = 1)
		)
group by Dishes.id
order by Sum(price) desc;
`, restaurantId)

	if err != nil {
		return nil, fmt.Errorf("sql query: %w", err)
	}

	defer rows.Close()

	var ds []Dish
	for rows.Next() {
		var d Dish

		if err = rows.Scan(&d.Name, &d.Sum, &d.Count); err != nil {
			return nil, fmt.Errorf("row scan: %w", err)
		}

		ds = append(ds, d)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("all rows error (rows.Err): %w", err)
	}

	return ds, nil
}

func getRestaurants(db *sql.DB) ([]Restaurant, error) {
	rows, err := db.Query(`
select id, mail, name
from restaurants;
`)

	if err != nil {
		return nil, fmt.Errorf("sql query: %w", err)
	}

	defer rows.Close()

	var rs []Restaurant
	for rows.Next() {
		var r Restaurant

		if err = rows.Scan(&r.Id, &r.Email, &r.Name); err != nil {
			return nil, fmt.Errorf("row scan: %w", err)
		}
		rs = append(rs, r)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("all rows error (rows.Err): %w", err)
	}

	return rs, nil

}

func generateReport(db *sql.DB, res Restaurant) (string, error) {
	payments, err := getPayments(db, res.Id)
	if err != nil {
		return "", fmt.Errorf("getPayments: %w", err)
	}

	dishes, err := getDishes(db, res.Id)
	if err != nil {
		return "", fmt.Errorf("getDishes: %w", err)
	}

	var totalSum float64
	for _, d := range dishes {
		totalSum += d.Sum
	}

	rep := Report{
		Date:           dateString,
		RestaurantName: res.Name,
		Dishes:         dishes,
		Payments:       payments,
		TotalSum:       totalSum,
	}

	log.Printf("Generating pdf for :%s\n", res.Name)

	tmpl := template.Must(template.New("Report").Parse(htmlTemplate))

	buf := new(bytes.Buffer)
	err = tmpl.Execute(buf, rep)

	if err != nil {
		return "", fmt.Errorf("tmpl.Execute: %w", err)
	}

	pdfg, err := wkhtml.NewPDFGenerator()
	if err != nil {
		return "", fmt.Errorf("wkhtml.NewPDFGenerator: %w", err)
	}
	pdfg.AddPage(wkhtml.NewPageReader(strings.NewReader(buf.String())))

	// Create PDF document in internal buffer
	err = pdfg.Create()
	if err != nil {
		return "", fmt.Errorf("pdfg.Create: %w", err)
	}
	result := new(bytes.Buffer)
	result = pdfg.Buffer()
	if err != nil {
		return "", fmt.Errorf("pdfg.Buffer: %w", err)
	}

	return result.String(), nil
}

func sendEmail(res Restaurant, report string) error {
	sender := New("afiyetapp@gmail.com", os.Getenv("GMAIL_APP_PASSWORD"), "smtp.gmail.com")
	m := NewMessage("Günlük Afiyet Raporu", "Raporunuz ektedir.")
	m.To = []string{res.Email}
	m.CC = []string{}
	m.BCC = []string{}
	m.Attach([]byte(report))
	err := sender.Send(m, "afiyetapp@gmail.com", "smtp.gmail.com")
	if err != nil {
		return fmt.Errorf("sending email: %w", err)
	}

	return nil
}

func emailWorker(ch chan Restaurant, total int) {
	var count int
	for res := range ch {
		count++
		if res.Email == "bos" {
			continue
		}

		err := sendEmail(res, res.pdf)
		fmt.Printf("Sent email to %s\n", res.Email)
		if err != nil {
			fmt.Printf("Cannot send email to %s: %s\n", res.Email, err.Error())
		}

		if count == total {
			return
		}
	}
}
