package main

import (
	"backend/internal/handler"
	"backend/internal/repository"
	"backend/internal/service"
	"backend/pkg/db"
	"context"
	"fmt"
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
)

func main() {
    client, err := db.ConnectMongoDB()
    if err != nil {
        log.Fatal(err)
    }
    defer client.Disconnect(context.Background())

    userRepo := repository.NewUserRepository(client.Database("horizon").Collection("users"))
    userService := service.NewUserService(userRepo)
    userHandler := handler.NewUserHandler(userService)

    r := mux.NewRouter()
    // Setup CORS
    c := cors.New(cors.Options{
        AllowedOrigins:   []string{"*"}, // Adjust this to your needs
        AllowedMethods:   []string{"POST", "GET", "OPTIONS", "PUT", "DELETE"},
        AllowedHeaders:   []string{"Accept", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization"},
        AllowCredentials: true,
        Debug:            true, // Set to false in production
    })

    // Apply the CORS middleware to the router
    handler := c.Handler(r)

    // Setup your routes
    r.HandleFunc("/api/register", userHandler.RegisterUser).Methods("POST")
    fmt.Println("Main Registering user")
    r.HandleFunc("/api/login", userHandler.LoginUser).Methods("POST")

    // Start the server with the CORS handler
    log.Println("Server is running at http://localhost:8000")
    log.Fatal(http.ListenAndServe(":8000", handler))
}