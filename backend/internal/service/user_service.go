package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"context"

	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (svc *UserService) CreateUser(ctx context.Context, user model.User) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	user.Password = string(hashedPassword)
	_, err = svc.repo.Create(ctx, user)
	return err
}

func (svc *UserService) AuthenticateUser(ctx context.Context, email, password string) (model.User, error) {
	user, err := svc.repo.FindByEmail(ctx, email)
	if err != nil {
		return model.User{}, err
	}

	err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	if err != nil {
		return model.User{}, err // Password does not match
	}

	return user, nil
}
