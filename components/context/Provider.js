import React, {createContext, useReducer, useState, useEffect} from 'react';
import { initialProduct, product } from './reducers/productReducer';
import { initialCart, cart } from './reducers/cartReducer';

export const GlobalContext = createContext();

export const GlobalProvider =(props)=>{
    const [productState, productDispatch] = useReducer(product, initialProduct)
    const [cartState, cartDispatch] = useReducer(cart, initialCart)
    const [loading, setLoading] =  useState(true)
//     useEffect(() => {
// // check for session
//     }, []);
    return(
        <GlobalContext.Provider value={{
            productState, 
            productDispatch,
            cartState, 
            cartDispatch

        }}>
            
            { props.children}
            {/* {!loading && props.children} */}
        </GlobalContext.Provider>
    )
}

