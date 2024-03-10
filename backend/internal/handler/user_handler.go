package handler

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/.aws/aws_prof_imgs"

	"encoding/json"
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"

	
	"context"
	"fmt"
)

type UserHandler struct {
	svc *service.UserService
}

func NewUserHandler(svc *service.UserService) *UserHandler {
	return &UserHandler{svc: svc}
}

func (h *UserHandler) RegisterUser(w http.ResponseWriter, r *http.Request) {
	
	var user model.User

	if err := json.NewDecoder(r.Body).Decode(&user); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	if err := h.svc.CreateUser(r.Context(), user); err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("User created successfully")
}

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}
//fix hashing
func generateJWTToken(user model.User) (string, error) {
	expirationTime := time.Now().Add(1 * time.Hour)
	claims := &Claims{
		Email: user.Email,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: expirationTime.Unix(),
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	tokenString, err := token.SignedString([]byte("YourSigningKey"))
	if err != nil {
		return "", err
	}

	return tokenString, nil
}

func (h *UserHandler) LoginUser(w http.ResponseWriter, r *http.Request) {
	var creds struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.svc.AuthenticateUser(r.Context(), creds.Email, creds.Password)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := generateJWTToken(user)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
		"email": user.Email,
	})
}

func (h *UserHandler) UploadProf(w http.ResponseWriter, r *http.Request) {

	var Img struct{
		AuthTok string
		Img		[]byte
	}

	if err := json.NewDecoder(r.Body).Decode(&Img); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.svc.FindUser(r.Context(), string(Img.AuthTok))
	if err != nil {
		fmt.Println("Error finding user", err)
		return
	}

	uploader, err := aws_prof_imgs.NewS3Uploader("horizonprofileimgs")
	if err != nil {
		fmt.Println("Error creating S3Uploader:", err)
		return
	}

	err = uploader.UploadPicture(context.Background(), Img.Img, "", user.Username)
	if err != nil {
		fmt.Println("Error uploading picture:", err)
		return
	}
}
