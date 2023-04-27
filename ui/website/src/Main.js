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

function Main() {

    const location = useLocation();
    const history = useHistory();
    const restaurant = useSelector(state => state.restaurantState);

    useEffect(() => {
        if (restaurant.restaurantId === undefined || restaurant.restaurantId === null) {
            history.push("/");
        }
    }, [restaurant]);

    return (
        <div className="App">
            {
                (location.pathname !== "/" && restaurant.restaurantId) ?
                    <Appbar /> : null
            }
            {
                (!restaurant.restaurantId) ?
                    <Switch>
                        <Route path="/">
                            <RestaurantLogin />
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
