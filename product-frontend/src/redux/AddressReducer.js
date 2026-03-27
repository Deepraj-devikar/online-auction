import { ADDRESS } from "./constants";

const initalState = {
    name: '',
    phoneNumber: '',
    fullAddress: '',
    city: '',
    state: '',
    addressType: 'home'
};

export default function AddressReducer(state = initalState, action) {
    switch (action.type) {
        case ADDRESS:
            return {
                ...state, 
                [action.key]: action.value
            };
        default:
            return state;
    }    
}