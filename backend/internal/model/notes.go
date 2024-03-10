package model

import( "time")

type Notes struct{
	Collaborators 	[]string    	 `json:"collaborators" bson:"collaborators"`
	Title 			string 	  		 `json:"title,omitempty" bson:"title,omitempty"`
	Description 	string			 `json:"description,omitempty" bson:"description,omitempty"`
	Content 		[]string		 `json:"content,omitempty" bson:"content,omitempty"`
	Date           	string           `json:"date,omitempty" bson:"date,omitempty"`       // Assuming Date is a string representation of a date
	UpdatedAt      	time.Time        `json:"updatedAt" bson:"updatedAt"`                 // Using time.Time for proper time representation
	Rank           	map[string]int   `json:"rank,omitempty" bson:"rank,omitempty"`       // Map of user IDs to their rank permissions
}