import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useState } from "react";
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';

import companyLogo from "../img/afiyet-logo-w.png";
import { RestaurantActions } from "../actions";
import { login } from "../endpoints";
import { useTranslation } from 'react-i18next';

const RestaurantLogin = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function authenticateRestaurant() {
        login({
            mail: email,
            password: password
        })
            .then((res) => {
                console.log(res);
                dispatch(RestaurantActions.setRestaurant(res.data));

                history.push("/restaurant-main");
                enqueueSnackbar(t("SNACKBAR.LOGIN_SUCCESS"), { variant: "success" });
            })
            .catch((err) => {
                console.log(err);
                enqueueSnackbar(t("SNACKBAR.LOGIN_ERROR"), { variant: "error" });
            })
    }

    return (
        <Box style={styles.restaurantLogin}>
            <Box style={styles.loginForm}>
                <img style={styles.companyLogo} src={companyLogo} alt="Afiyet Logosu" />
                <Box>
                    <FormControl>
                        <Box style={styles.usernameField}>
                            <TextField
                                id="outlined-search"
                                value={email}
                                onChange={(event) => { setEmail(event.target.value) }}
                                label={t("LOGIN.EMAIL")}
                                type="search"
                            />
                        </Box>
                        <Box>
                            <TextField
                                id="outlined-password-input"
                                value={password}
                                onChange={(event) => { setPassword(event.target.value) }}
                                label={t("LOGIN.PASSWORD")}
                                type="password"
                                autoComplete="current-password"
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button
                                fullWidth
                                style={{ textTransform: 'none' }}
                                onClick={authenticateRestaurant}
                                variant="contained"
                                color="success">
                                {t("LOGIN.LOGIN_BUTTON")}
                            </Button>
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button
                                fullWidth
                                style={{ textTransform: 'none' }}
                                onClick={() => { history.push("/signup") }}
                                variant="contained"
                                color="info">
                                {t("LOGIN.SIGNUP_BUTTON")}
                            </Button>
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button
                                fullWidth
                                style={{ textTransform: 'none' }}
                                onClick={() => { history.push("/forgot-password") }}
                                variant="contained"
                                color="secondary">
                                {t("LOGIN.FORGOT_PASSWORD_BUTTON")}
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Box>
    );
}

let styles = {
    restaurantLogin: {
        backgroundColor: '#d82227',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '100vh',
    },
    loginForm: {
        backgroundColor: 'white',
        padding: '4rem',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '15px',
    },
    companyLogo: {
        height: '150px',
        width: '150px',
        alignSelf: 'center',
    },
    usernameField: {
        marginTop: '25px',
        marginBottom: '25px',
    },
    buttonContainer: {
        marginTop: '25px',
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'none',
    },
};

export default RestaurantLogin;