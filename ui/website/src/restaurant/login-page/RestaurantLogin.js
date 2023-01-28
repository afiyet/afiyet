import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import "./RestaurantLogin.css";
import companyLogo from "../../img/afiyet-logo-w.png";

const RestaurantLogin = () => 
{
    let navigate = useNavigate();

    const routeChange = () => { 
      let path = "restaurant-main"; 
      navigate(path);
    }

    return (
        <div className="restaurant-login">
            <div className="login-form">
                <img className="company-logo" src={companyLogo} alt="Afiyet Logosu"/>
                <div className="form">
                    <form>
                        <div className="username-field">
                            <TextField id="outlined-search" label="Kullanıcı Adı" type="search" />
                        </div>
                        <div className="password-field">
                            <TextField
                                id="outlined-password-input"
                                label="Şifre"
                                type="password"
                                autoComplete="current-password"
                            />
                        </div>
                        <div className="button-container">
                            <Button style={{textTransform: 'none'}} onClick={routeChange} variant="contained" color="success">Giriş Yap</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantLogin;