import { useState } from "react";
import { Box, Button, TextField, Typography,Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import { forgotPassword } from "../endpoints";
import companyLogo from "../img/afiyet-logo-w.png";
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';

const RestaurantForgotPassword = () => {
  const { t, i18n } = useTranslation();
  const [mail, setMail] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  function handleClickForgotPassword() {
    forgotPassword(mail)
      .then((res) => {
        console.log(res)
        enqueueSnackbar(t("SNACKBAR.FORGOT_PASSWORD_SUCCESS"), { variant: "success" });
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar(t("SNACKBAR.FORGOT_PASSWORD_ERROR"), { variant: "error" });
      });
  }

  return (
    <>
        <Box style={styles.restaurantLogin}>
            <Box style={styles.loginForm}>
                <img style={styles.companyLogo} src={companyLogo} alt="Afiyet Logosu" />
                <Box style={styles.descriptionBox}>
                    <Typography style={styles.description} variant="subtitle">{t("SIGNUP_PAGE.FORGOT_PASSWORD_DESCRIPTION")}</Typography>
                    <a style={styles.emailButton} href="mailto:afiyetapp.helpdesk@gmail.com" target="_blank">
                        <Typography sx={{ fontFamily: 'Monospace',color: "#90a4ae" }} variant="subtitle" align="right">afiyetapp.helpdesk@gmail.com</Typography>
                    </a>
                </Box>
                <Box style={styles.forgotForm}>
                    <FormControl>
                        <Box style={styles.usernameField}>
                            <TextField
                                id="outlined-search"
                                value={mail}
                                onChange={(event) => { setMail(event.target.value) }}
                                label={t("LOGIN.EMAIL")}
                                type="search"
                                style={{width: 250}}
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button
                                style={{ textTransform: 'none' }}
                                onClick={() => handleClickForgotPassword()}
                                variant="contained"
                                color="success">
                                {t("LOGIN.FORGOT_PASSWORD_BUTTON")}
                            </Button>
                        </Box>
                    </FormControl>
                </Box>
            </Box>
        </Box>
        </>
  );
};

export default RestaurantForgotPassword;

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
    forgotForm: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '20px'
    },
    loginForm: {
        backgroundColor: 'white',
        padding: '4rem',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
        display: 'flex',
        maxWidth: "300px",
        flexDirection: 'column',
        borderRadius: '15px',
    },
    companyLogo: {
        height: '150px',
        width: '150px',
        alignSelf: 'center',
        marginBottom: '20px',
    },
    usernameField: {
        marginTop: '25px',
        marginBottom: '25px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        textTransform: 'none',
        marginBottom: '-20px'
    },
    descriptionBox: {
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
    },
    emailButton: {
        alignSelf: 'flex-end',
        textDecoration: 'none',
        cursor: 'pointer',
    }

};
