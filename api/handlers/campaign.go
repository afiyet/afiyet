package handlers

import (
	"fmt"
	"github.com/afiyet/afiytet/api/data/model"
	"github.com/afiyet/afiytet/api/service"
	"github.com/labstack/echo/v4"
	"net/http"
	"strconv"
	"strings"
)

type CampaignHandler struct {
	s service.CampaignService
}

func (h *CampaignHandler) Add(c echo.Context) error {
	var cBind model.Campaign
	err := (&echo.DefaultBinder{}).BindBody(c, &cBind)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	base64, extension, err := parseRawBase64(cBind.Picture)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	cBind.Picture = base64

	u, err := h.s.Add(cBind, extension)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *CampaignHandler) Delete(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	err = h.s.Delete(id)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}
	return c.JSON(http.StatusOK, "Campaign successfully Deleted")
}

func (h *CampaignHandler) Get(c echo.Context) error {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		return c.JSON(http.StatusBadRequest, fmt.Sprintf("%s is not number", idStr))
	}

	u, err := h.s.Get(id)

	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, u)
}

func (h *CampaignHandler) List(c echo.Context) error {
	us, err := h.s.List()
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, us)
}

func (h *CampaignHandler) Update(c echo.Context) error {
	var updateImage bool
	var extension string

	idStr := c.Param("id")
	id, _ := strconv.Atoi(idStr)

	var cBind model.Campaign
	err := (&echo.DefaultBinder{}).BindBody(c, &cBind)
	if err != nil {
		return err
	}
	cBind.ID = uint(id)

	// If new base64 have sent
	if !strings.Contains(cBind.Picture, service.CloudFrontUrl) {
		updateImage = true

		cBind.Picture, extension, err = parseRawBase64(cBind.Picture)
		if err != nil {
			return c.JSON(http.StatusBadRequest, err.Error())
		}
	}

	cam, err := h.s.Update(cBind, updateImage, extension)
	if err != nil {
		return c.JSON(http.StatusBadRequest, err.Error())
	}

	return c.JSON(http.StatusOK, cam)
}
