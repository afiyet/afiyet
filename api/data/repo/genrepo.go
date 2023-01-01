package repo

import (
	"gorm.io/gorm"
)

type GenericRepository[Entity any] struct {
	db *gorm.DB
}

func NewGenericRepository[Entity any](db *gorm.DB) GenericRepository[Entity] {
	return GenericRepository[Entity]{
		db: db,
	}
}

func (g GenericRepository[Entity]) Get(id int) (*Entity, error) {
	var e Entity
	err := g.db.First(&e, id).Error

	if err != nil {
		return nil, err
	}

	return &e, nil
}

func (g GenericRepository[Entity]) Delete(id int) error {
	var e Entity
	err := g.db.Delete(&e, id).Error

	if err != nil {
		return err
	}

	return nil
}

func (g GenericRepository[Entity]) List() ([]Entity, error) {
	var es []Entity
	err := g.db.Find(&es).Error

	if err != nil {
		return nil, err
	}

	return es, nil
}

func (g GenericRepository[Entity]) Add(e Entity) (*Entity, error) {
	err := g.db.Create(&e).Error

	if err != nil {
		return nil, err
	}

	return &e, nil
}

func (g GenericRepository[Entity]) Update(e Entity) (*Entity, error) {
	err := g.db.Save(&e).Error

	if err != nil {
		return nil, err
	}
	return &e, nil
}
