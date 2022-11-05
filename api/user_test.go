package main

import (
	"encoding/json"
	"github.com/labstack/echo/v4"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func TestUser(t *testing.T) {
	repo := &MockRepository{
		users: []User{
			{Name: "Baris", Id: "0"},
			{Name: "Oncum", Id: "1"},
			{Name: "Umut", Id: "2"},
			{Name: "UmutCil", Id: "3"},
			{Name: "UmutInce", Id: "4"},
		},
	}

	h := UserHandler{
		repo: repo,
	}

	e := echo.New()

	t.Run("Get", func(t *testing.T) {
		// TODO make parallel
		id := 0 // TODO extend
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)
		c.SetParamNames("id")
		c.SetParamValues(strconv.Itoa(id))

		if assert.NoError(t, h.Get(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
			bs, err := json.Marshal(repo.users[id])
			assert.NoError(t, err)
			assert.JSONEq(t, string(bs), rec.Body.String())
		}
	})

	t.Run("List", func(t *testing.T) {
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)

		if assert.NoError(t, h.List(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
			bs, err := json.Marshal(repo.users)
			assert.NoError(t, err)
			assert.JSONEq(t, string(bs), rec.Body.String())
		}
	})

	t.Run("Delete", func(t *testing.T) {
		id := 0
		prevLength := len(repo.users) // :(
		req := httptest.NewRequest(http.MethodGet, "/", nil)
		rec := httptest.NewRecorder()
		c := e.NewContext(req, rec)
		c.SetParamNames("id")
		c.SetParamValues(strconv.Itoa(id))

		if assert.NoError(t, h.Delete(c)) {
			assert.Equal(t, http.StatusOK, rec.Code)
			assert.Equal(t, prevLength-1, len(repo.users))
		}
	})

}
