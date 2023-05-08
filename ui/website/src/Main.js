import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import RestaurantLogin from "./restaurant/RestaurantLogin";
import RestaurantMain from "./restaurant/RestaurantMain";
import TablesPage from "./restaurant/TablesPage";
import EditMenu from "./restaurant/EditMenu";
import Appbar from "./restaurant/components/Appbar";
import { useLocation, Redirect } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import CommentsPage from "./restaurant/CommentsPage";
import OrdersPage from "./restaurant/OrdersPage";
import RestaurantSignUp from "./restaurant/RestaurantSignUp";
import RestaurantForgotPassword from "./restaurant/RestaurantForgotPassword";
import RestaurantChangePassword from "./restaurant/RestaurantChangePassword";
import RedPage from "./restaurant/RedPage";
import { useTranslation } from "react-i18next";

function Main() {

    const location = useLocation();
    const history = useHistory();
    const restaurant = useSelector(state => state.restaurantState);
    const {t, i18n} = useTranslation();

    useEffect(() => {
        if (restaurant.restaurantId === undefined || restaurant.restaurantId === null) {
            history.push("/login");
        }
    }, [restaurant]);

    useEffect(() => {
        i18n.changeLanguage(navigator.language.substring(0,2));
    }, []);

    return (
        <div className="App">
            {
                (location.pathname !== "/" && restaurant.restaurantId) ?
                    <Appbar /> : null
            }
            {
                (!restaurant.restaurantId) ?
                    <Switch>
                        <Route path="/signup">
                            <RestaurantSignUp />
                        </Route>
                        <Route path="/forgot-password">
                            <RestaurantForgotPassword />
                        </Route>
                        <Route path="/change-password">
                            <RestaurantChangePassword />
                        </Route>
                        <Route path="/login">
                            <RestaurantLogin />
                        </Route>
                        <Route path="/">
                            <RedPage />
                        </Route>
                        <Redirect push to="/" />
                    </Switch>
                    :
                    <Switch>
                        <Route path="/orders" exact>
                            <OrdersPage />
                        </Route>
                        <Route path="/tables" exact>
                            <TablesPage />
                        </Route>
                        <Route path="/restaurant-main" exact>
                            <RestaurantMain />
                        </Route>
                        <Route path="/edit-menu" exact>
                            <EditMenu />
                        </Route>
                        <Route path="/comments" exact>
                            <CommentsPage />
                        </Route>
                        <Redirect push to="/tables" />
                    </Switch>
            }
        </div>

    );
}

export default Main;
