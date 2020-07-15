export const initialState = {
    basket: [],
    user: null
};

export const getBasketTotal = basket => basket?.reduce((amount, item) => amount + item.price, 0);

export default function reducer(state, action) {
    console.log(action);
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.user
            };
        case 'ADD_TO_BASKET':
            // LOGIC TO ADD PRODUCTS INTO BASKET
            return {
                ...state,
                basket: [...state.basket, action.item]
            };
        case 'REMOVE_FROM_BASKET':
            // LOGIC TO REMOVE PRODUCTS FROM BASKET
            const index = state.basket.findIndex(item => item.id === action.id);
            let newBasket = [...state.basket];
            if (index >= 0) {
                newBasket.splice(index, 1);
            } else {
                console.warn(`can't remove product id: ${index}`);
            }
            return {
                ...state,
                basket: newBasket
            };
        default:
            return state;
    }
}