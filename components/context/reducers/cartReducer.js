import { CART_LOADING, CART_SUCCESS, CART_ERROR, CART_CLEAR } from "../actionsType/actiontypes";
export const initialCart ={
    cartLoad: false,
    cart: [],
    cartError:null,
}
export const cart =(state = initialCart, action)=>{
     const {type, payload} = action;
    switch(type){
        case CART_LOADING:
            return{
                ...state,
                cartLoad:true,
                cartError: null,
            }
        case CART_SUCCESS:
        return {
            ...state,
            cartLoad:false,
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
        default:
            return state

    }
}
