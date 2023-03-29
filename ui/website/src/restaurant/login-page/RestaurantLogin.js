import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./RestaurantLogin.css";
import companyLogo from "../../img/afiyet-logo-w.png";
import { login } from "../../endpoints";
import { useState } from "react";
import { useDispatch } from 'react-redux';
import UserActions from "../../actions/UserActions";

const RestaurantLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");


    function authenticateRestaurant() {
        login({
            mail: email,
            password: password
        })
            .then((res) => {
                console.log(res);
                dispatch(UserActions.setUser(res.data));
                navigate("/restaurant-main");
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <div className="restaurant-login">
            <div className="login-form">
                <img className="company-logo" src={companyLogo} alt="Afiyet Logosu" />
                <div className="form">
                    <form>
                        <div className="username-field">
                            <TextField
                                id="outlined-search"
                                value={email}
                                onChange={(event) => {setEmail(event.target.value)}}
                                label="Kullanıcı Adı"
                                type="search"
                            />
                        </div>
                        <div className="password-field">
                            <TextField
                                id="outlined-password-input"
                                value={password}
                                onChange={(event) => {setPassword(event.target.value)}}
                                label="Şifre"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="button-container">
                            <Button style={{ textTransform: 'none' }} onClick={authenticateRestaurant} variant="contained" color="success">Giriş Yap</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantLogin;