import { WISHLIST_DATA } from "./constants";

const initalState = {
    wishlistData: 0,
};

export default function WishlistReducer(state = initalState, action) {
    switch (action.type) {
        case WISHLIST_DATA:
            return {
                ...state,
                wishlistData: action.wishlistData
            };
        default:
            return state;
    }    
}