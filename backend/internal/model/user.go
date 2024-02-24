package model

type User struct {
    Username string `json:"username" bson:"username"`
    Nickname string `json:"nickname,omitempty" bson:"nickname,omitempty"`
    Email    string `json:"email" bson:"email"`
    Password string `json:"password" bson:"password"`
}