import { useState, useEffect, useContext } from 'react'
import ReactPaginate from 'react-paginate';
import {data} from '../util/data'
import { FILTER_SUCCESS, FILTER_SUCCESS_PREV } from '../helper/context/actionsType/actiontypes';
import {GlobalContext} from '../helper/context/Provider';


export default function Pagination() {
    const {productState,  productDispatch} = useContext(GlobalContext);
    const { products, prevProducts } = productState;

    const [ pageNumber, setPageNumber ] = useState(0);
    const productPerPage = 6;
    const pagesVisited = pageNumber * productPerPage;
    const pageCount = Math.ceil(prevProducts.length / productPerPage);
    const displayProducts = (num1, num2) =>{
        let myProduct = prevProducts.slice(num1, num2);
        return (
            productDispatch({
            type:FILTER_SUCCESS,
            loading: false,
            payload: myProduct,
        })
        )
    }
    useEffect(() => {
        displayProducts(pagesVisited, pagesVisited + productPerPage)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageNumber, prevProducts]);
    
    useEffect(() => { //reset page no to zero after filter
        setPageNumber(0);
    }, [prevProducts])
    const handleChangePage = ({selected}) => {
        setPageNumber(selected);
    }
    return (
        <div className="">
           <ReactPaginate
                previousLabel = {
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11 2L3 10L11 18" stroke="black" strokeWidth="3"/>
                    </svg>
                }
                nextLabel = {
                    <svg width="13" height="20" viewBox="0 0 13 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 2L10 10L2 18" stroke="black" strokeWidth="3"/>
                    </svg>
                }
                pageCount = {pageCount}
                onPageChange = {handleChangePage}
                containerClassName = "pagination-container flex justify-center items-center"
                previousLinkClassName = "pagination-container__prev"
                nextLinkClassName = "pagination-container__next"
                disabledClassName = "pagination-container__disabled"
                pageClassName = "pagination-container__li"
                activeClassName = "pagination-container__active"
           />
        </div>
    )
}
