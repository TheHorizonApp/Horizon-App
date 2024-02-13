package db

import (
    "context"
    "time"
    "go.mongodb.org/mongo-driver/mongo"
    "go.mongodb.org/mongo-driver/mongo/options"
)

// ConnectMongoDB initializes a MongoDB client and connects to the database
func ConnectMongoDB() (*mongo.Client, error) {
    clientOptions := options.Client().ApplyURI("mongodb://localhost:27017") // Adjust the URI as needed
    ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
    defer cancel()
    client, err := mongo.Connect(ctx, clientOptions)
    if err != nil {
        return nil, err
    }

    // Check the connection
    err = client.Ping(ctx, nil)
    if err != nil {
        return nil, err
    }

    return client, nil
}
