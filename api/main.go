package main

import (
	"fmt"
	"net/http"
)

const WelcomeMessage = "Enjoy your meal!"

// workflow test

func home(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, WelcomeMessage)
}

func main() {
	http.HandleFunc("/", home)

	if err := http.ListenAndServe(":8080", nil); err != nil {
		panic(err)
	}
}
