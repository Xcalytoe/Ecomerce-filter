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
  // isFilterOpen not openFilter, it should like an action not a boolean
  const [openFilter, setOpenFilter] = useState(true);
  const { productState, cartState, cartDispatch } = useContext(GlobalContext);
  const { loading, products } = productState;
  const { cart } = cartState;

  const handleAddToCart = (product) => {
    // This products variable is useless, just do payload: [...cart, product]
    let products = [...cart, product];
    cartDispatch({
      // push product to global state
      type: CART_SUCCESS,
      payload: products,
    });
  };

  // Should be a component not a variable
  // This .slice is something you should use useMemo for
  const allProducts = products?.slice(0, 6).map((val, index) => {
    // The six above is magic constants and you can do better than `val` for variable
    return !val.featured ? ( // You should have filtered this off instead of rendering null
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
    console.log("dghjkhg"); //Nice :thumbsup
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
          {/* Do you need pagination when loafing, this should be inside the {allProducts block} */}
        </main>
      </div>
    </div>
  );
}
