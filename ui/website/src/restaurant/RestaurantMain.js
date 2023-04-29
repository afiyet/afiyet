import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useId } from "react";
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MapLeaflet from './components/mainPage/MapLeaflet';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { toBase64 } from '../util';
import { getRestaurantInfo, updateRestaurantInfo } from '../endpoints';
import { RestaurantActions } from '../actions';

const RestaurantMain = () => {
  /**
   * 
   * restaurantId: "",
    name: "",
    address: "",
    category: "",
    location: "",
    password: "",
    mail: "",
    picture: "",
    latitude: "",
    longitude: ""
   * 
   */

  const restaurantState = useSelector(state => state.restaurantState);
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [picture, setPicture] = useState("");
  const [campaignPicture, setCampaignPicture] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const id = useId();
  const [pictureBase64, setPictureBase64] = useState("");
  const [campaignPictureBase64, setCampaignPictureBase64] = useState("");

  function handleRestaurantStateChange() {
    setName(restaurantState.name);
    setAddress(restaurantState.address);
    setCategory(restaurantState.category);
    setPassword(restaurantState.password);
    setMail(restaurantState.mail);
    setPicture(restaurantState.picture);
    setLatitude(restaurantState.latitude);
    setLongitude(restaurantState.longitude);
    setCampaignPicture(restaurantState.campaignPicture);
  }

  useEffect(() => {
    handleRestaurantStateChange();
    console.log(restaurantState);
  }, [restaurantState])

  async function handlePicture() {
    let file = document.getElementById(id).files[0];
    const b64 = await toBase64(file);
    setPictureBase64(b64);
  }

  async function handleCampaignPicture() {
    let file = document.getElementById(id+"campaign").files[0];
    const b64 = await toBase64(file);
    setCampaignPictureBase64(b64);
  }

  function handleClickUpdate() {
    let payload = {
      name: name,
      address: address,
      category: category,
      //password: "",
      mail: mail,
      picture: pictureBase64 || picture,
      latitude: latitude,
      longitude: longitude,
      //campaignPicture: campaignPictureBase64 || picture
    }

    updateRestaurantInfo(restaurantState.restaurantId, payload)
      .then((res) => {
        //snackbar
        getRestaurantInfo(restaurantState.restaurantId)
          .then((res) => {
            dispatch(RestaurantActions.setRestaurant(res.data));
          })
          .catch((err) => {
            console.log(err);
          })
      })
      .catch((err) => {
        console.log(err);
        //snackbar
      })
  }

  return (
    <Box style={styles.container}>
      <Box style={styles.contentContainer}>
        <Typography style={styles.pageTitle} gutterBottom variant="h3">{t("MAIN_PAGE.TITLE")}</Typography>
        <Box style={styles.restaurantInfoTextFieldContainer}>
          <Box style={styles.imgAndTextFields}>
            <Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box style={styles.imageBox}>
                    <Typography style={styles.pageTitle} gutterBottom variant="button">{t("MAIN_PAGE.RESTAURANT_PICTURE")}</Typography>
                    <Button
                      component="label"
                      variant="text"
                      style={{ minHeight: 350 }}
                    >
                      {((picture !== "" && picture != null) || (pictureBase64 !== "" && pictureBase64 != null)) ?
                        <img height={350} width={"100%"} src={pictureBase64 || picture} style={styles.t} />
                        :
                        <AddAPhotoIcon style={styles.t} sx={{ margin: 0 }} />
                      }
                      <input id={id} type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={handlePicture} />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box style={styles.imageBox}>
                    <Typography style={styles.pageTitle} gutterBottom variant="button">{t("MAIN_PAGE.CAMPAIGN_PICTURE")}</Typography>
                    <Button
                        component="label"
                        variant="text"
                        style={{ minHeight: 350 }}
                    >
                      {((campaignPicture !== "" && campaignPicture != null) || (campaignPictureBase64 !== "" && campaignPictureBase64 != null)) ?
                          <img height={350} width={"100%"} src={campaignPictureBase64 || campaignPicture} style={styles.t} />
                          :
                          <AddAPhotoIcon style={styles.t} sx={{ margin: 0 }} />
                      }
                      <input id={id+"campaign"} type="file" accept="image/png, image/gif, image/jpeg" hidden onChange={handleCampaignPicture} />
                    </Button>
                  </Box>
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.NAME")}
                    variant="outlined"
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.CATEGORY")}
                    variant="outlined"
                    value={category}
                    onChange={(e) => { setCategory(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.MAIL")}
                    variant="outlined"
                    value={mail}
                    onChange={(e) => { setMail(e.target.value) }}
                    disabled
                  />
                </Grid>
                <Grid item xs={3}>
                  <Button
                    fullWidth
                    size="large"
                    variant="contained"
                    style={{ height: "100%" }}
                  >
                    {t("MAIN_PAGE.CHANGE_PASSWORD")}
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.ADDRESS")}
                    variant="outlined"
                    value={address}
                    onChange={(e) => { setAddress(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.LATITUDE")}
                    variant="outlined"
                    value={latitude}
                    onChange={(e) => { setLatitude(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.LONGITUDE")}
                    variant="outlined"
                    value={longitude}
                    onChange={(e) => { setLongitude(e.target.value) }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='contained'
                    fullWidth
                    style={{ height: "100%" }}
                    onClick={handleClickUpdate}
                  >
                    {t("MAIN_PAGE.UPDATE_BUTTON")}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box>
            {
              (restaurantState.latitude !== "" || restaurantState.latitude !== "") ?
                <MapLeaflet
                  latitude={restaurantState.latitude}
                  longitude={restaurantState.longitude}
                />
                :
                null
            }
          </Box>
        </Box>


      </Box>
    </Box>
  );
}

export default RestaurantMain;

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",

    justifyContent: "center",
    alignItems: "center",

  },
  contentContainer: {
    width: '70vw',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#d82227',
    marginTop: '2vh',
    borderRadius: '1vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    padding: 20,
  },
  pageTitle: { fontFamily: "monospace", color: "#fff" },
  restaurantInfoTextFieldContainer: {
    width: '65wv',
    display: 'flex',
    flexDirection: 'column',
    padding: '2vh',
    marginBottom: '1vh',
    backgroundColor: '#fff',
    borderRadius: '1vh',
    boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    margin: 10
  },
  imgAndTextFields: {
    paddingBottom: 20
  },
  imageBox: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: '#d82227',
    borderRadius: '1vh',
    padding: 20,
  }

};
