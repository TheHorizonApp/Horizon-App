package model


type User struct {
	Username 	string     `json:"username" bson:"username"`
	Nickname 	string     `json:"nickname,omitempty" bson:"nickname,omitempty"`
	Email    	string     `json:"email" bson:"email"`
	Password 	string     `json:"password" bson:"password"`
	Profile  	string     `json:"profile,omitempty" bson:"profile,omitempty"`
	Friends  	[]string   `json:"friends,omitempty" bson:"friends,omitempty"`
    Groups 		[]string   `json:"group,omitempty" bson:"groups,omitempty"`
    Personal 	[]string   `json:"personal,omitempty" bson:"personal,omitempty"`
    Calender 	string     `json:"calender,omitempty" bson:"calender,omitempty"`
    Deadlines 	[]string   `json:"deadlines,omitempty" bson:"deadlines,omitempty"`
    Token 		[]string   `json:"token,omitempty" bson:"token ,omitempty"`
}