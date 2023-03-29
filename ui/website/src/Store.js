import {legacy_createStore} from "redux";
import reducers from "./reducers";

const Store = legacy_createStore(reducers);

export default Store;