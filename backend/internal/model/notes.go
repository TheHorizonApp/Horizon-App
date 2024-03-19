package model

import( "time")

type Notes struct{
	Collaborators 	[]string    	 `json:"collaborators" bson:"collaborators"`
	Title 			string 	  		 `json:"title" bson:"title"`
	Description 	string			 `json:"description" bson:"description"`
	Content 		[]string		 `json:"content" bson:"content"`
	Date           	string           `json:"date" bson:"date"`       // Assuming Date is a string representation of a date
	UpdatedAt      	time.Time        `json:"updatedAt" bson:"updatedAt"`                 // Using time.Time for proper time representation
	Rank           	map[string]int   `json:"rank" bson:"rank"`       // Map of user IDs to their rank permissions
}