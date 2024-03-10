package repository

import (
	"backend/internal/model"
	"context"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type UserRepository struct {
    db *mongo.Collection
}

func NewUserRepository(db *mongo.Collection) *UserRepository {
    return &UserRepository{db: db}
}

// Create saves a new user into the database
func (repo *UserRepository) Create(ctx context.Context, user model.User) (*mongo.InsertOneResult, error) {
    return repo.db.InsertOne(ctx, user)
}

// FindByEmail finds a user by email
func (repo *UserRepository) FindByEmail(ctx context.Context, email string) (model.User, error) {
    var user model.User
    err := repo.db.FindOne(ctx, bson.M{"email": email}).Decode(&user)
    return user, err
}

func (repo *UserRepository) FindByJWT(ctx context.Context, token string) (model.User, error) {
    var user model.User
    err := repo.db.FindOne(ctx, bson.M{"AuthTok": token}).Decode(&user)
    return user, err
}