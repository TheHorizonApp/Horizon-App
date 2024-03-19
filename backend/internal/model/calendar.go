package model


// Calendar represents a calendar with time blocks and tags.
type Calendar struct {
	ID				string 		`json:"_id" bson:"_id"`
	TimeBlocks		[]string 	`json:"timeBlocks" bson:"timeBlocks"` // Assuming that timeBlocks are referenced by their IDs
	Tasks       	[]Task		`json:"tags" bson:"tags"` // A slice of Tag structs, representing a set of tags
}