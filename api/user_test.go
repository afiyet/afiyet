package main

import (
	"testing"
)

func TestUser(t *testing.T) {
	/* repo := &MockRepository{
		users: []User{
			{Name: "Baris", Surname: "Ikinci", Mail: "barisikinci@hotmail.com"},
			{Name: "Mehmet Umut", Surname: "Ince", Mail: "umutince@proronmail.com"},
			{Name: "Emin Umut", Surname: "Gercek", Mail: "umutgercek@yahoo.com"},
			{Name: "Umut", Surname: "Ciloglu", Mail: "umutciloglu@gmail.com.com"},
			{Name: "Oncum Korkmaz", Surname: "Yilmaz", Mail: "oncumkorkmaz@hotmail.com"},
		},
	}

	h := UserHandler{}

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
	*/
}
