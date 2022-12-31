import { useNavigate } from "react-router-dom";

import "./RestaurantLogin.css";
import companyLogo from "../../img/afiyet-logo.png";

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
                        <div className="input-container">
                            <label>Kullanıcı Adı</label>
                            <input type="text" name="uname" required />
                        </div>
                        <div className="input-container">
                            <label>Şifre</label>
                            <input type="password" name="pass" required />
                        </div>
                        <div className="button-container">
                            <input onClick={routeChange} type="submit" value="Giriş Yap" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default RestaurantLogin;