import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import { login } from '../endpoints';
import { useDispatch } from 'react-redux';
import { RestaurantActions } from '../actions';

export default function RedPage() {

    const history = useHistory();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        let savedLoginInfo = window.localStorage.getItem("afiyet-login-info");

        if (savedLoginInfo !== null && savedLoginInfo !== undefined) {

            let payload = JSON.parse(savedLoginInfo);

            login(payload)
                .then((res) => {
                    console.log(res);
                    dispatch(RestaurantActions.setRestaurant(res.data));
                    saveLoginInfoToLocalStorage(payload);
                    history.push(location.pathname);
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            history.push("/login");
        }
    }, []);

    function saveLoginInfoToLocalStorage(payload) {
        window.localStorage.setItem("afiyet-login-info", JSON.stringify(payload));
    }

    return (
        <Box style={styles.container}>

        </Box>
    )
}

let styles = {
    container: {
        backgroundColor: '#d82227',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '20px',
        height: '100vh',
    },
};
