package model
// Tag represents a calendar tag with a name and associated color.
type Tag struct {
	Name  	string `json:"name" bson:"name"`
	Color 	string `json:"color" bson:"color"`
}