package model

type Deadline struct {
	Due        	string 		`json:"due" bson:"due"`                   // String representation of a due date, consider using time.Time
	Name       	string 		`json:"name" bson:"name"`
	LastEdited 	string 		`json:"lastEdited" bson:"lastEdited"` // Could also be time.Time for precise timestamps
}