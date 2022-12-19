import { useState } from "react";
import "./RestaurantLogin.css";
import companyLogo from "../../img/afiyet-logo.png";

const RestaurantLogin = () => 
{
    const [errorMessage, setErrorMessage] = useState();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const database = [
    {
        username: "baris",
        password: "ikinci"
    },
    {
        username: "umut",
        password: "inceeer"
    },
    {
        username: "umut",
        password: "ciloglu"
    },
    {
        username: "umut",
        password: "gercek"
    },
    {
        username: "oncum",
        password: "yilmaz"
    }
    ];

    const error = "Kullanıcı adı ya da şifre hatalı"

    const handleSubmit = (event) => {
        event.preventDefault();
        var { uname, pass } = document.forms[0];

        const userData = database.find((user) => user.username === uname.value);

        if (userData) {
            if (userData.password !== pass.value) {
                setErrorMessage({error});
            } 
            else {
                setIsSubmitted(true);
            }
        }         
        else {
            setErrorMessage({error});
        }
    };

    const renderErrorMessage = () =>
        errorMessage !== undefined && (
        <div className="error">{errorMessage}</div>
    );

    const renderForm = (
        <div className="form">
            <form onSubmit={handleSubmit}>
                <div className="input-container">
                    <label>Kullanıcı Adı</label>
                    <input type="text" name="uname" required />
                </div>
                <div className="input-container">
                    <label>Şifre</label>
                    <input type="password" name="pass" required />
                </div>
                <div className="button-container">
                    <input type="submit" value="Giriş Yap" />
                    {renderErrorMessage()}
                </div>
            </form>
        </div>
    );

    return (
        <div className="restaurant-login">
            <div className="login-form">
                <img className="company-logo" src={companyLogo} alt="Afiyet Logosu"/>
                {isSubmitted ? <div>User is successfully logged in</div> : renderForm}
            </div>
        </div>
    );
}

export default RestaurantLogin;