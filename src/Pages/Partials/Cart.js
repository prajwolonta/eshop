import React, {useContext} from "react"
import {AppContext} from "../../Contexts/AppContext"
import {Link} from "react-router-dom"
import 'remixicon/fonts/remixicon.css'


const Cart = ()=>{
    const cartContext = useContext(AppContext)
    let cartItems = ''
    let price = 0
    if(cartContext.totalCartItems > 0){
        cartItems = cartContext.cartItems.map((product)=>{
            const qty = product.qty || 1
            price += qty * product.price
            return(
                <div key={`cart_item_${product.id}`}>

                    <div className="row">
                        <div className="col">{product.name}</div>
                        <div className="col">Qty <input
                            type="number"
                            className="form-control form-inline"
                            name='qty'
                            onChange={
                                (event)=>cartContext.updateQty(event, product.id)} value={qty}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">NPR {product.price}</div>
                        <div className="col">{product.price * qty}</div>
                        <div className="col">

                            <button
                                className="btn btn-danger btn-sm"
                                onClick={()=>cartContext.removeItem(product.id)}>
                                <i className="ri-delete-bin-line"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )
        })
    }



    return (
        <>
            <h2>My Cart</h2>
            <p> There are {cartContext.totalCartItems} items in your cart.</p>

            {
                cartContext.totalCartItems > 0 ?
                    <>
                        { cartItems }
                        <p>Your Total is NPR. {price}</p>
                        <button className="btn btn-danger btn-block" onClick={()=>(cartContext.clearAllItems())}>Clear Cart</button>
                        <Link to="/checkout" className="btn btn-warning btn-block">Proceed to checkout</Link>`
                    </>
                    :
                    ''
            }
        </>
    )
}

export default Cart
