package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
)

type RatingHandler struct {
	s *service.RatingService
}

func (h *RatingHandler) Add(c echo.Context) error {
	var rbind model.Rating
	err := (&echo.DefaultBinder{}).BindBody(c, &rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	r, err := h.s.Add(rbind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, r)
}

func (h *RatingHandler) Delete(c echo.Context) error {
	idStr := c.Param("ratingId")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.s.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, "Rating successfully Deleted")
}
