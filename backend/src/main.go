package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		fmt.Fprintf(w, "Welcome to the best desk booking app evaaaaaa")
	})

	fmt.Println("Server is starting...")
	http.ListenAndServe(":8080", nil)
}
