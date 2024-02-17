package model

type User struct {
    ID        string `json:"id,omitempty" bson:"_id,omitempty"`
    FirstName string `json:"firstName" bson:"firstName"`
    LastName  string `json:"lastName" bson:"lastName"`
    Email     string `json:"email" bson:"email"`
    Password  string `json:"password" bson:"password"` 
}