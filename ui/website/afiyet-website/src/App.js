import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RestaurantLogin from "./restaurant/login-page/RestaurantLogin";
import RestaurantMain from "./restaurant/main-page/RestaurantMain";
import GenerateQr from "./restaurant/qr-generation-page/GenerateQr";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<RestaurantLogin />}></Route>
          <Route exact path="/restaurant-main" element={<RestaurantMain />}></Route>
          <Route exact path="/generate-qr" element={<GenerateQr />}></Route>
        </Routes>
      </div>
    </Router> 
  );
}

export default App;
