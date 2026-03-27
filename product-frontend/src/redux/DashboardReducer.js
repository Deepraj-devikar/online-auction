import { BOOK_PAGE, CART_PAGE, SEARCH } from "./constants";

const initalState = {
    pageView: 'home',
    book: null,
    search: ''
}

export default function DashboardReducer(state = initalState, action) {
    switch (action.type) {
        case BOOK_PAGE:
            return {
                ...state, 
                pageView: 'book',
                book: action.book
            };
        case CART_PAGE:
            return {
                ...state, 
                pageView: 'cart'
            };
        case SEARCH:
            return {
                ...state,
                search: action.search
            }
        default:
            return state;
    }    
}