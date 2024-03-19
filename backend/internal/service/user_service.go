package service

import (
	"backend/internal/model"
	"backend/internal/repository"
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"golang.org/x/crypto/bcrypt"
)

type UserService struct {
	repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{repo: repo}
}

func (svc *UserService) CreateUser(ctx context.Context, user model.User, isOauth bool) error {
	if !isOauth {
		hashedPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)
		if err != nil {
			return err
		}
		user.Password = string(hashedPassword)  // Issue: Convert byte slice to string
	}
	println(user.Password)
    _, err := svc.repo.Create(ctx, user)
    return err
}

func (svc *UserService) AuthenticateUser(ctx context.Context, email, username, password string) (model.User, error) {
	if username == ""{
		user, err := svc.repo.FindByEmail(ctx, email)
		if err != nil {
			return model.User{}, err
		}
	
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
		if err != nil {
			return model.User{}, err // Password does not match
		}
	
		return user, nil

	} else{
		user, err := svc.repo.FindByUserName(ctx, username)
		if err != nil {
			return model.User{}, err
		}
	
		err = bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
		if err != nil {
			return model.User{}, err // Password does not match
		}
	
		return user, nil
	}

}

func (svc *UserService) FindUser(ctx context.Context, token string) (model.User, error) {
	user, err := svc.repo.FindByJWT(ctx, token)
	if err != nil {
		return model.User{}, err
	}
	return user, nil
}

func (svc *UserService) UpdateUser(ctx context.Context,filter string, email string, field string, token string) error {
	filt := bson.M{filter: email}
	update := bson.M{"$set": bson.M{field: token}}

	result, err := svc.repo.Update(context.Background(), filt, update)
		if err != nil {
			fmt.Println(result)
		return err
		}
	return nil
}
