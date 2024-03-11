package model


type User struct {
	Username 	string     `json:"username" bson:"username"`
	Nickname 	string     `json:"nickname" bson:"nickname"`
	Email    	string     `json:"email" bson:"email"`
	Password 	string     `json:"password" bson:"password"`
	Profile  	string     `json:"profile" bson:"profile"`
	Friends  	[]string   `json:"friends" bson:"friends"`
    Groups 		[]string   `json:"group" bson:"groups"`
    Personal 	[]string   `json:"personal" bson:"personal"`
    Calender 	string     `json:"calender" bson:"calender"`
    Deadlines 	[]string   `json:"deadlines" bson:"deadlines"`
    Token 		string   	`json:"token" bson:"token"`
}
