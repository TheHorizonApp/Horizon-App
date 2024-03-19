package model

type Room struct {
	Notes      	[]string          `json:"notes" bson:"notes"` // Assuming that notes are referenced by their IDs
	Members    	[]string          `json:"members" bson:"members"` // User IDs of members
	Rank       	map[string]int    `json:"rank" bson:"rank"` // Map of user IDs to their rank permissions
	Deadlines  	[]string          `json:"deadlines" bson:"deadlines"` // Assuming that deadlines are referenced by their IDs
}