package repo

import (
	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
	"gorm.io/gorm/clause"
)

type RestaurantRepository struct {
	GenericRepository[model.Restaurant]
	db *gorm.DB
}

func NewRestaurantRepository(db *gorm.DB) RestaurantRepository {
	rr := RestaurantRepository{
		GenericRepository: NewGenericRepository[model.Restaurant](db),
		db:                db,
	}

	return rr
}

func (r RestaurantRepository) GetDishes(id int) ([]model.Dish, error) {
	var ds []model.Dish
	err := r.db.Where("restaurant_id = ?", id).Find(&ds).Error

	if err != nil {
		return nil, err
	}

	return ds, nil
}

func (rr RestaurantRepository) GetRatings(id int) ([]model.Rating, error) {
	var rs []model.Rating
	err := rr.db.Preload("User").Preload(clause.Associations).Where("restaurant_id", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RestaurantRepository) GetOrders(id int) ([]model.Order, error) {
	var rs []model.Order
	err := rr.db.Where("restaurant_id", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RestaurantRepository) GetTables(id int) ([]model.Table, error) {
	var rs []model.Table
	err := rr.db.Where("id=").Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (rr RestaurantRepository) GetRestaurantAverageRating(id int) (float64, error) {
	var avg float64
	row := rr.db.Table("ratings").Where("restaurant_id = ?", id).Select("avg(point)").Row()
	err := row.Scan(&avg)

	if err != nil {
		return 0, err
	}

	return avg, nil
}

func (ur RestaurantRepository) GetRestaurantLoginInfo(mail string) (*model.Restaurant, error) {

	var response model.Restaurant
	err := ur.db.Where("mail", mail).Find(&response).Error
	if err != nil {
		return &model.Restaurant{}, err
	}

	return &response, nil
}

func (ur RestaurantRepository) Search(str string) ([]model.LocationQuery, error) {

	var ds []model.LocationQuery
	ur.db.Raw("select * from get_search_with_ratings('" + str + "')").Scan(&ds)

	return ds, nil
}
