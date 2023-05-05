import {useEffect, useState} from "react";
import { Box, Button, TextField, Typography,Container } from "@mui/material";
import { useTranslation } from "react-i18next";
import companyLogo from "../img/afiyet-logo-w.png";
import FormControl from '@mui/material/FormControl';
import { useSnackbar } from 'notistack';
import {changePassword} from "../endpoints/signup/signupEndpoints";
import { useParams } from "react-router-dom";

const RestaurantChangePassword = () => {
  const { t, i18n } = useTranslation();
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const {params} = useParams();
  const [token,setToken] = useState("");
  const [error,setError] = useState(false);

  useEffect(() => {
    if (params.token === ""){
        setError(true)
    }

    setToken((params.token))
  },[])

  function handle() {
      if (p1 !== p2){
          enqueueSnackbar(t("SNACKBAR.CHANGE_PASSWORD_MISMATCH"), { variant: "error" }); // TODO
          return
      }

      let payload = {
            tempPassword: p1,
            token: token
      }

    changePassword(payload)
      .then((res) => {
        console.log(res)
        enqueueSnackbar(t("SNACKBAR.CHANGE_PASSWORD_SUCCESS"), { variant: "success" }); //TODO
      })
      .catch((err) => {
        console.log(err)
        enqueueSnackbar(t("SNACKBAR.CHANGE_PASSWORD_ERROR"), { variant: "error" }); // TODO
      });
  }

  return (
    <>
        <Box style={styles.changePassword}>
            <FormControl>
                <Box style={styles.fields}>
                    <Box style={styles.passwordField}>
                        <TextField
                            id="outlined-search"
                            value={p1}
                            onChange={(event) => { setP1(event.target.value) }}
                            label={t("LOGIN.NEW_PASSWORD")} // TODO
                            type="password"
                            style={{width: 250}}
                        />
                    </Box>
                    <Box style={styles.passwordField}>
                        <TextField
                            id="outlined-search"
                            value={p2}
                            onChange={(event) => { setP2(event.target.value) }}
                            label={t("LOGIN.NEW_PASSWORD")} // TODO
                            type="password"
                            style={{width: 250}}
                        />
                    </Box>
                    <Box style={styles.changeButton}>
                        <Button
                            style={{ textTransform: 'none' }}
                            onClick={() => handle()}
                            variant="contained"
                            color="success">
                            {t("LOGIN.FORGOT_PASSWORD_BUTTON")}
                        </Button>
                    </Box>
                </Box>
            </FormControl>
        </Box>
        </>
  );
};

export default RestaurantChangePassword;

let styles = {
    changePassword: { backgroundColor: '#d82227', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px', },
    fields: {
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
};
