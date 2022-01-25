import { CART_LOADING, CART_SUCCESS, CART_INACTIVE, CART_ACTIVE, CART_ERROR, CART_CLEAR } from "../actionsType/actiontypes";
export const initialCart ={
    cartLoad: false,
    cart: [],
    cartError:null,
}
export const cart =(state = initialCart, action)=>{
     const {type, payload} = action;
    switch(type){
        case CART_SUCCESS:
        return {
            ...state,
            cartLoad:true,
            cartError: null,
            cart: payload,
        }
        case CART_ERROR:
            return {
                ...state,
                cartLoad:false,
                cartError: payload,
            }
        case CART_CLEAR:
            return {
                cartLoad: false,
                cart: [],
                cartError:null,
            }
        case CART_ACTIVE:
            return {
                ...state,
                cartLoad: true,
            }
        case CART_INACTIVE:
            return {
                ...state,
                cartLoad: false,
            }
        default:
            return state

    }
}
