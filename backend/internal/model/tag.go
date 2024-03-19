package model
// Tag represents a calendar tag with a name and associated color.
type Task struct {
	Name  	string `json:"name" bson:"name"`
	Tag 	string `json:"color" bson:"color"`
}