import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MapLeaflet from './components/main/MapLeaflet';

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
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");
  const [password, setPassword] = useState("");
  const [mail, setMail] = useState("");
  const [picture, setPicture] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  function handleRestaurantStateChange() {
    setName(restaurantState.name);
    setAddress(restaurantState.address);
    setCategory(restaurantState.category);
    setPassword(restaurantState.password);
    setMail(restaurantState.mail);
    setPicture(restaurantState.picture);
    setLatitude(restaurantState.latitude);
    setLongitude(restaurantState.longitude);
  }

  useEffect(() => {
    handleRestaurantStateChange();
  }, [restaurantState])


  return (
    <Box style={styles.container}>
      <Box style={styles.contentContainer}>
        <Typography style={styles.pageTitle} gutterBottom variant="h3">{t("MAIN_PAGE.TITLE")}</Typography>
        <Box style={styles.restaurantInfoTextFieldContainer}>
          <Box style={styles.imgAndTextFields}>
            <Box>
              <Grid container spacing={2}>
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
                  <TextField
                    fullWidth
                    id="outlined-basic"
                    label={t("MAIN_PAGE.PASSWORD")}
                    variant="outlined"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value) }}
                  />
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
                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label={t("MAIN_PAGE.LATITUDE")}
                            variant="outlined"
                            value={latitude}
                            onChange={(e) => { setLatitude(e.target.value) }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            fullWidth
                            id="outlined-basic"
                            label={t("MAIN_PAGE.LONGITUDE")}
                            variant="outlined"
                            value={longitude}
                            onChange={(e) => { setLongitude(e.target.value) }}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={6}>
                      <Button>
                        <img src='https://images.deliveryhero.io/image/fd-tr/LH/wltj-hero.jpg?width=1600&height=400&quality=45' width={"100%"} />
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Button variant='contained' fullWidth>
                    Update
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
  }

};
