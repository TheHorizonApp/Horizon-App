package model

type Room struct {
	Notes      	[]string          `json:"notes,omitempty" bson:"notes,omitempty"` // Assuming that notes are referenced by their IDs
	Members    	[]string          `json:"members,omitempty" bson:"members,omitempty"` // User IDs of members
	Rank       	map[string]int    `json:"rank,omitempty" bson:"rank,omitempty"` // Map of user IDs to their rank permissions
	Deadlines  	[]string          `json:"deadlines,omitempty" bson:"deadlines,omitempty"` // Assuming that deadlines are referenced by their IDs
}