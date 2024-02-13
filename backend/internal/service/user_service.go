package service

import (
    "context"
    "backend/internal/model"
    "backend/internal/repository"
    "golang.org/x/crypto/bcrypt"
)

type UserService struct {
    repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
    return &UserService{repo: repo}
}

// CreateUser creates a new user with hashed password
func (svc *UserService) CreateUser(ctx context.Context, user model.User) error {
    hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
    if err != nil {
        return err
    }
    user.Password = string(hashedPassword)
    _, err = svc.repo.Create(ctx, user)
    return err
}
