package model


// Calendar represents a calendar with time blocks and tags.
type Calendar struct {
	ID				string 		`json:"_id" bson:"_id"`
	TimeBlocks		[]string 	`json:"timeBlocks,omitempty" bson:"timeBlocks,omitempty"` // Assuming that timeBlocks are referenced by their IDs
	Tags       		[]Tag 		`json:"tags,omitempty" bson:"tags,omitempty"` // A slice of Tag structs, representing a set of tags
}