import { getMarkers } from "./map/mapEndpoints"
import { login, signUp } from "./auth/authEndpoints";
import { getSearchResults } from "./search/searchEndpoints";
import { initializePayment, getWebViewUrlFromAWS, getPaymentResult, completePayment, checkEmptyTableStatus } from "./cart/cartEndpoints";
import { getRestaurantComments, addCommentToRestaurant } from "./comment/commentEndpoints";
import { getRestaurant, getRestaurants, getRestaurantMenu, getRestaurantsWithCampaignPicture } from "./order/orderEndpoints";
import { sendChangePasswordMail } from "./password/passwordEndpoints";

export {
    getMarkers,
    login,
    signUp,
    getSearchResults,
    initializePayment,
    getWebViewUrlFromAWS, 
    getPaymentResult,
    completePayment,
    getRestaurantComments,
    getRestaurant, 
    getRestaurants, 
    getRestaurantMenu,
    addCommentToRestaurant,
    getRestaurantsWithCampaignPicture,
    sendChangePasswordMail,
    checkEmptyTableStatus
};