import { useContext } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {GlobalContext} from './context/Provider';
import { CART_CLEAR, CART_INACTIVE } from './context/actionsType/actiontypes';


export default function CartDropdown() {
    const {cartState, cartDispatch} = useContext(GlobalContext);
    const { cart, cartLoad } = cartState;
    let cartItem = cart.map((item, index) => {
        return  <div key={`cartItem${index}`}>
                    <Link href="/">
                        <a className="flex cart-dropdown__flex items-center justify-between">
                            <div>
                                <p className="cart-dropdown__name">{item.name}</p>
                                <p className="cart-dropdown__price">${item.price}</p>
                            </div>
                            <div>
                                <Image 
                                    width={149} 
                                    height={86} 
                                    src={item.image.src} 
                                    placeholder="blur" 
                                    blurDataURL={item.image.src} 
                                    alt={item.image.alt}
                                    className="object-cover"
                                />
                            </div>
                        </a>
                    </Link>
                    <div className="underline"></div>
                </div>
    })
    // clear cart function 
    const clearCart = () => {
        return cartDispatch({// clear cart items
            type:CART_CLEAR,
            cart: [],
            cartError:null,
        })
    }
    // close cart function 
    const handleCloseCart = () => {
        return cartDispatch({
            type:CART_INACTIVE,
            cartLoad: false,
        })
    }
    return (
        <>
            {cartLoad ?
                <div className="cart-container">
                    <div className="cart-dropdown">
                        <div className="text-right mb-4">
                            <button onClick={handleCloseCart}>
                                <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2 2L20 20" stroke="black" strokeWidth="4"/>
                                    <path d="M2 20L20 2" stroke="black" strokeWidth="4"/>
                                </svg>

                            </button>
                        </div>
                        {cartItem}
                        {cart.length === 0 ? 
                        <p className="cart-dropdown__empty">Cart empty</p>:
                        <div className="text-center">
                            <button className="cart-dropdown__clear-btn" onClick={clearCart}>CLEAR</button>
                        </div>
                        }
                    </div>
                </div>:
                null
            }
        </>
        
    )
}
