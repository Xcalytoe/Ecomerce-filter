import React, {createContext, useReducer, useState, useEffect} from 'react';
import { initialProduct, product } from './reducers/productReducer';

export const GlobalContext = createContext();

export const GlobalProvider =(props)=>{
    const [productState, productDispatch] = useReducer(product, initialProduct)
    const [loading, setLoading] =  useState(true)
//     useEffect(() => {
// // check for session
//     }, []);
    return(
        <GlobalContext.Provider value={{
            productState, 
            productDispatch

        }}>
            
            { props.children}
            {/* {!loading && props.children} */}
        </GlobalContext.Provider>
    )
}

