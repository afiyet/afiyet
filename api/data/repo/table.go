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

	var rest model.Restaurant

	fmt.Println(restId)

	err := tr.db.Preload("Tables.Orders").Find(&rest, restId).Error

	if err != nil {
		return false, err
	}

	if len(rest.Tables) == 0 {
		return false, err
	}

	for i := 0; i < len(rest.Tables); i++ {
		if len(rest.Tables[i].Orders) == 0 {
			return true, nil
		}
	}

	return false, nil
}

func (tr TableRepository) DoesHaveRemoteOrder(id int) (bool, error) {
	var table model.Table

	fmt.Println(id)

	err := tr.db.Preload("Orders").Find(&table, id).Error

	if err != nil {
		return false, err
	}

	if len(table.Orders) == 0 {
		return false, nil
	}

	for i := 0; i < len(table.Orders); i++ {
		if table.Orders[i].IsRemote == 1 {
			return true, nil
		}
	}

	return false, nil
}
