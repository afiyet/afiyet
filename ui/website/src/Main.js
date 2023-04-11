import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RestaurantLogin from "./restaurant/login-page/RestaurantLogin";
import RestaurantMain from "./restaurant/main-page/RestaurantMain";
import GenerateQr from "./restaurant/qr-generation-page/GenerateQr";
import AddTable from "./restaurant/add-table-page/AddTable";
import EditMenu from "./restaurant/edit-menu-page/EditMenu";
import Appbar from "./restaurant/Appbar";
import { useLocation } from 'react-router-dom';

function Main() {

    const location = useLocation();

    return (
        <div className="App">
            {
                (location.pathname !== "/") ?
                    <Appbar /> : null
            }
            <Routes>
                <Route exact path="/" element={<RestaurantLogin />}></Route>
                <Route exact path="/restaurant-main" element={<RestaurantMain />}></Route>
                <Route exact path="/generate-qr" element={<GenerateQr />}></Route>
                <Route exact path="/tables" element={<AddTable />}></Route>
                <Route exact path="/edit-menu" element={<EditMenu />}></Route>
            </Routes>
        </div>

    );
}

export default Main;
