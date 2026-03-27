import { CART_DATA } from "./constants";

const initalState = {
    cartData: 0,
};

export default function CartReducer(state = initalState, action) {
    switch (action.type) {
        case CART_DATA:
            return {
                ...state,
                cartData: action.cartData
            };
        default:
            return state;
    }    
}