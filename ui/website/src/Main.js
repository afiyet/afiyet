import { BrowserRouter as Router, Route, Switch, useHistory } from "react-router-dom";
import RestaurantLogin from "./restaurant/login-page/RestaurantLogin";
import RestaurantMain from "./restaurant/main-page/RestaurantMain";
import TablesPage from "./restaurant/add-table-page/TablesPage";
import EditMenu from "./restaurant/EditMenu";
import Appbar from "./restaurant/components/Appbar";
import { useLocation } from 'react-router-dom';
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Main() {

    const location = useLocation();
    const history = useHistory();
    const restaurant = useSelector(state => state.restaurantState);

    useEffect(() => {
        if(restaurant.restaurantId === undefined || restaurant.restaurantId === null) {
            history.push("/");
        }
    }, [restaurant]);

    return (
        <div className="App">
            {
                (location.pathname !== "/") ?
                    <Appbar /> : null
            }
            <Switch>
                <Route exact path="/">
                    <RestaurantLogin />
                </Route>
                <Route exact path="/restaurant-main">
                    <RestaurantMain />
                </Route>
                <Route exact path="/tables">
                    <TablesPage />
                </Route>
                <Route exact path="/edit-menu">
                    <EditMenu />
                </Route>
            </Switch>
        </div>

    );
}

export default Main;
