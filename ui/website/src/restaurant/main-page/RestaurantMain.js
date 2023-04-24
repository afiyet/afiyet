import "./RestaurantMain.css"
import { useSelector } from 'react-redux'
import { useEffect } from "react";

const RestaurantMain = () => {

  const user = useSelector(state => state.restaurantState);

  useEffect(() => {
    //console.log(user);
  }, [])

    return (
      <div className="restaurant-main-page">
          
      </div>      
    );
  }
   
  export default RestaurantMain;