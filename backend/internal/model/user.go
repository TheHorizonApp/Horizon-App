package model

// User represents a user in the system
type User struct {
    ID        string `json:"id,omitempty" bson:"_id,omitempty"`
    FirstName string `json:"firstName" bson:"firstName"`
    LastName  string `json:"lastName" bson:"lastName"`
    Email     string `json:"email" bson:"email"`
    Password  string `json:"password" bson:"password"` // This should be hashed and never sent to the client
}