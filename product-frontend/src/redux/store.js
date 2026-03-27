import { combineReducers, createStore } from "redux";
import DashboardReducer from './DashboardReducer';
import CartReducer from "./CartReducer";
import AddressReducer from "./AddressReducer";
import WishlistReducer from "./WishlistReducer";

const reducer = combineReducers({
    DashboardReducer,
    CartReducer,
    AddressReducer,
    WishlistReducer
});

const store = createStore(reducer);

export default store;