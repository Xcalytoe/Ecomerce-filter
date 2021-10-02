import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {data} from '../util/data'
import {GlobalContext} from '../components/context/Provider';
import { FILTER_LOADING, FILTER_SUCCESS } from '../components/context/actionsType/actiontypes';


export default function SidebarFilter() {
    const [filters, setFilters] = useState([])
    const {productState,  productDispatch} = useContext(GlobalContext);

        // handle onChange 
    const onChange = (e) =>{
        if (e.target.checked) {
            setFilters([...filters, e.target.value]);
          } else {
            setFilters(filters.filter(id => id !== e.target.value));
          }
    }
    useEffect(() => {
        if (filters.length === 0){
            productDispatch({
                type:FILTER_SUCCESS,
                loading: false,
                payload: data.products
            })
        }else{
            // set loader to true 
            productDispatch({
                type:FILTER_LOADING,
                loading: true,
              })
            
            let myProduct = data.products.filter((item) => {
                    
                return  filters.some(name => {
                    if (name === "lower") {

                    return [item.price].flat() < 20;

                    }else if (name === "20-100") {

                    return ([item.price].flat() >= 20 && [item.price].flat() <= 100);

                    }else if (name === "100-200") {

                    return ([item.price].flat() >= 100 && [item.price].flat() <= 200);

                    }else if (name === "more") {

                    return [item.price].flat() > 200;

                    } else {
                    return [item.category].flat().includes(name)
                    }
                })
            })
            // send products to global state 
            setTimeout(() =>  productDispatch({
                type:FILTER_SUCCESS,
                loading: false,
                payload: myProduct
                }), 2000)
          
        }
    }, [filters]);
// filter category 
    const category = [{name: "People"}, {name: "Premium"}, {name: "Pets"}, {name: "Food"}, {name: "Landmarks"}, {name: "Cities"}, {name: "Nature"}];
    const categoryLabel = category.map((val, index)=>{
        return  <label key={`category${index}`}className="flex items-center">
                    <input type="checkbox"  name={`option${index}`} value={val.name.toLocaleLowerCase()} onChange={onChange}/>
                    <div></div> {/* checkbox */}
                    <span>{val.name}</span>
                </label>
    });
    // price filter 
    const price = [
        {name: "Lower than $20", val: "lower"},
        {name: "$20 - $100", val: "20-100"}, 
        {name: "$100 - $200", val: "100-200"}, 
        {name: "More than $200", val: "more"}, 
    ];
    const priceLabel = price.map((val, index)=>{
        return  <label key={`price${index}`} className="flex items-center">
                    <input type="checkbox" value={val.val.toLocaleLowerCase()}  onChange={onChange}/>
                    <div></div> {/* checkbox */}
                    <span>{val.name}</span>
                </label>
    });
    return (
        <aside>
            <div className="filter__sidebar">
                <div>
                    <h4>Category</h4>
                    {categoryLabel}
                    <div className="underline"></div>
                </div>
                <div>
                    <h4>Price range</h4>
                    {priceLabel}
                </div>
            </div>
        </aside>
    )
}
