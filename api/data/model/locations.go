package model

type LocationQuery struct {
	ID           uint
	Name         string
	Address      string
	Category     string
	Latitude     float64
	Longitude    float64
	AvgPoint     float64
	CommentCount int
	Picture      string
}
