package repo

import (
	"fmt"

	"github.com/afiyet/afiytet/api/data/model"
	"gorm.io/gorm"
)

type TableRepository struct {
	GenericRepository[model.Table]
	db *gorm.DB
}

func NewTableRepository(db *gorm.DB) TableRepository {
	tr := TableRepository{
		GenericRepository: NewGenericRepository[model.Table](db),
		db:                db,
	}
	return tr
}

func (tr TableRepository) GetWithRestaurantId(id int) ([]model.Table, error) {
	var rs []model.Table
	err := tr.db.Where("restaurant_id = ?", id).Find(&rs).Error

	if err != nil {
		return nil, err
	}

	return rs, nil
}

func (tr TableRepository) GetOrders(id int) ([]model.Order, error) {
	var ds []model.Order
	err := tr.db.Where("restaurant_id = ?", id).Find(&ds).Error

	if err != nil {
		return nil, err
	}

	return ds, nil
}

func (tr TableRepository) SwitchTable(OrderId int, to int) error {

	err := tr.db.Raw("Update orders Set table_id = ? where id = ?", to, OrderId).Error

	if err != nil {
		return err
	}

	return nil
}

type Temp struct {
	Foo int
}

func (tr TableRepository) IsEmptyTable(restId int) (bool, error) {

	var temp Temp

	err := tr.db.Raw("select t.id as foo from tables t left join orders o on t.id = o.table_id where o.table_id  is null and t.restaurant_id = ? limit 1", restId).Scan(&temp).Error

	if err != nil {
		return false, err
	}

	fmt.Printf(" %d --- TEMP FOO", temp.Foo)

	// if res == nil {
	// 	return false, nil
	// }

	return true, nil
}
