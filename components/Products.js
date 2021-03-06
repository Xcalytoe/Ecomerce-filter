import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { GlobalContext } from "../helper/context/Provider";
import SidebarFilter from "./SidebarFilter";
import Skeleton from "./Skeleton";
import Sort from "./Sort";
import { CART_SUCCESS } from "../helper/context/actionsType/actiontypes";
import Pagination from "./Pagination";

export default function Filter() {
  const [openFilter, setOpenFilter] = useState(true);
  const { productState, cartState, cartDispatch } = useContext(GlobalContext);
  const { loading, products } = productState;
  const { cart } = cartState;

  const handleAddToCart = (product) => {
    let products = [...cart, product];
    cartDispatch({
      // push product to global state
      type: CART_SUCCESS,
      payload: products,
    });
  };

  const allProducts = products?.slice(0, 6).map((val, index) => {
    return !val.featured ? (
      <div className="products-grid__item" key={`item${index}`}>
        <div className="products-grid__image">
          {/* best seller tag */}
          {val.bestseller ? <span> Best Seller</span> : null}
          <Image
            src={val.image.src}
            width={282}
            height={398}
            placeholder="blur"
            layout="responsive"
            blurDataURL={val.image.src}
            alt={val.image.alt}
            className="object-cover"
          />
          <button
            onClick={() => handleAddToCart(val)}
            className="products-grid__button"
          >
            Add to Cart
          </button>
        </div>
        <p className="products-grid__category">{val.category}</p>
        <p className="products-grid__name">{val.name}</p>
        <p className="products-grid__amount">${val.price} </p>
      </div>
    ) : null;
  });
  // mobile filter activator
  const toggleFilter = () => {
    setOpenFilter(!openFilter);
    console.log("dghjkhg");
  };
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
        <Sort toggleFilter={toggleFilter} />
      </div>
      <div className="filter__grid grid">
        <SidebarFilter toggleFilter={toggleFilter} openFilter={openFilter} />
        <main>
          {loading ? (
            <Skeleton />
          ) : (
            <div className="products-grid grid">{allProducts}</div>
          )}
          <Pagination />
        </main>
      </div>
    </div>
  );
}
