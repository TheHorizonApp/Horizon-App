package handler

import (
	"backend/internal/model"
	"backend/internal/service"
	"backend/aws/aws_prof_imgs"

	"encoding/json"
	"net/http"
	"time"
	"github.com/dgrijalva/jwt-go"

	"crypto/sha256"
	"encoding/hex"
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
	var reg struct {
		Email   	 string `json:"email"`
		Username	 string	`json:"username"`
		Img 	 	 []byte `json:"image"`
		OAuth		 bool	`json:"oauth"`
		Password	 string	`json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&reg); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	user.Email = reg.Email
	user.Username = reg.Username
	user.Password = reg.Password
	user.OAuth = reg.OAuth
	print(user.OAuth)

	fmt.Println(user.Password)
	if err := h.svc.CreateUser(r.Context(), user, reg.OAuth); err != nil {
		http.Error(w, "Failed to create user", http.StatusInternalServerError)
		return
	}
	if reg.OAuth{
		if err := awsUpload(reg.Img, reg.Username); err != nil {
			http.Error(w, "Failed to upload image", http.StatusInternalServerError)
			return
		}
	}

	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode("User created successfully")
}

type Claims struct {
	Email string `json:"email"`
	jwt.StandardClaims
}

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
		Email   	 string `json:"email"`
		Username	 string	`json:"username"`
		Password 	 string `json:"password"`
	}

	if err := json.NewDecoder(r.Body).Decode(&creds); err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	user, err := h.svc.AuthenticateUser(r.Context(), creds.Email, creds.Username, creds.Password)
	if err != nil {
		http.Error(w, "Invalid credentials", http.StatusUnauthorized)
		return
	}

	token, err := generateJWTToken(user)
	if err != nil {
		http.Error(w, "Failed to generate token", http.StatusInternalServerError)
		return
	}

	tokHash := hashSHA256(token)
	err = h.svc.UpdateUser(r.Context(),"email", creds.Email, "token", tokHash)
	if err != nil{
		fmt.Println(err)
	}

	json.NewEncoder(w).Encode(map[string]string{
		"token": token,
		"email": user.Email,
	})
}

func hashSHA256(input string) string {
	var hash = sha256.New()

	hash.Write([]byte(input))

	hashInBytes := hash.Sum(nil)
	hashString := hex.EncodeToString(hashInBytes)

	return hashString
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

	tokHash := hashSHA256(Img.AuthTok)
	user, err := h.svc.FindUser(r.Context(), string(tokHash))
	if err != nil {
		fmt.Println("Error finding user", err)
		return
	}

	err = awsUpload(Img.Img, user.Username)
	if err != nil {
		fmt.Println("sumting wong")
	}
}

func awsUpload(image []byte, username string) error{
	uploader, err := aws_prof_imgs.NewS3Uploader("horizonprofileimgs")
	if err != nil {
		fmt.Println("Error creating S3Uploader:", err)
		return err
	}

	err = uploader.UploadPicture(context.Background(), image, "", username)
	if err != nil {
		fmt.Println("Error uploading picture:", err)
		return err
	}

	return nil
}