import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {GlobalContext} from './context/Provider';
import SidebarFilter from './SidebarFilter';
import Skeleton from './Skeleton';
import Sort from './Sort';
import { cart } from './context/reducers/cartReducer';
import { CART_SUCCESS } from './context/actionsType/actiontypes';
import Pagination from './Pagination';


export default function Filter() {
    const {productState, cartState,  cartDispatch} = useContext(GlobalContext);
    const {loading , products} = productState;
    const { cart } = cartState;

    const handleAddToCart = (product) => {
        let products = [...cart, product];
        cartDispatch({// push product to global state
            type:CART_SUCCESS,
            loading: false,
            payload: products
        })
    }

    const allProducts = products?.slice(0,6).map((val, index) => {
    //    console.log(val)
       return ((!val.featured) ? 
       <div className="products-grid__item" key={`item${index}`}>
           <div className="products-grid__image">
                    {/* best seller tag */}
                {val.bestseller ? <span> Best Seller</span> : null}
                <Image  src={val.image.src} width={282} height={398} placeholder="blur" blurDataURL={val.image.src} alt={val.image.alt}/>
                <button onClick={()=> handleAddToCart(val)} className="products-grid__button">Add to Cart</button>
           </div>
           <p className="products-grid__category">{val.category}</p>
           <p className="products-grid__name">{val.name}</p>
           <p className="products-grid__amount">${val.price} </p>
        </div> :
        null
       )
    });
    return (
        <div className="filter">
           <div className="filter__header flex justify-between items-center">
                <div>
                    <Link href="/">
                        <a>
                            <span>Photography</span>
                        </a>
                    </Link>
                    <span className="split px-3">/</span>
                    <span>Premium Photos</span>
                </div>
                {/* sorting component  */}
                <Sort/>

           </div>
           <div className="filter__grid grid">
               <SidebarFilter/>
               <main>
                    {loading ? <Skeleton/> : <div className="products-grid grid">{allProducts}</div>}
                    <Pagination/>
               </main>
           </div>
        </div>
    )
}
