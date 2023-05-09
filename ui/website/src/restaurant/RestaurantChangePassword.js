import React, {useEffect, useState} from "react";
import { Box, Button, TextField, Typography,Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import companyLogo from "../img/afiyet-logo-w.png";
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';
import {changePassword} from "../endpoints/signup/signupEndpoints";
import { useParams } from "react-router-dom";
import LockResetIcon from '@mui/icons-material/LockReset';

const RestaurantChangePassword = () => {
  const { t, i18n } = useTranslation();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const [token,setToken] = useState("");
  const [error,setError] = useState(false);

  useEffect(() => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    const token = params.get('token');

    setToken(token);
  },[]);

  function handle() {
      if (p1 !== p2){
          enqueueSnackbar(t("FORGOT_PASSWORD.PASS_NEQ"), { variant: "error" });
          return
      }

      let payload = {
            tempPassword: p1,
            token: token
      }

    changePassword(payload)
      .then((res) => {
        console.log(res)
        enqueueSnackbar(t("FORGOT_PASSWORD.CHANGE_OK"), { variant: "success" });
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar(t("FORGOT_PASSWORD.CHANGE_ERR"), { variant: "error" });
      });
  }

  return (
    <Box style={styles.outer}>
        <Box style={styles.form}>
            <img style={styles.companyLogo} src={companyLogo} alt="Afiyet Logosu" />
            <Box>
                <FormControl>
                    <Box style={styles.fields}>
                        <Box style={styles.passwordField}>
                            <TextField
                                id="p1"
                                value={p1}
                                onChange={(event) => { setP1(event.target.value) }}
                                label={t("FORGOT_PASSWORD.PASS_1")}
                                type="password"
                                style={{width: 250}}
                            />
                        </Box>
                        <Box style={styles.passwordField}>
                            <TextField
                                id="p2"
                                value={p2}
                                onChange={(event) => { setP2(event.target.value) }}
                                label={t("FORGOT_PASSWORD.PASS_2")}
                                type="password"
                                style={{width: 250}}
                                error={p2 !== "" && p1 !== p2}
                                helperText={p1 !== p2 && p2 !== "" ? t("FORGOT_PASSWORD.PASS_NEQ"): ""}
                            />
                        </Box>
                        <Box style={styles.buttonContainer}>
                            <Button
                                style={{ textTransform: 'none' }}
                                onClick={() => handle()}
                                variant="contained"
                                color="success"
                                startIcon={<LockResetIcon />}
                                >
                                {t("FORGOT_PASSWORD.BUTTON")}
                            </Button>
                        </Box>
                    </Box>
                </FormControl>
            </Box>
        </Box>
    </Box>
  );
};

let styles = {
    outer: {
        backgroundColor: '#d82227',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '100vh',
    },
    form: {
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
    passwordField: {
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

export default RestaurantChangePassword;