import React, {useContext} from "react"
import { Link } from "react-router-dom"
import {AppContext} from "../../Contexts/AppContext"
import 'remixicon/fonts/remixicon.css'

const SingleProduct = ({product})=>{

    const cartContext = useContext(AppContext)
    const firstImage = product.images[0]



    return (

            <div key={product.id} className="col-6 col-md-4">
                <div className="product-card">
                    <div className="image">
                    <Link to={`/product/${product.id}`} >
                        <img alt={product.name} className="img-thumbnail img-fluid rounded mx-auto d-block" src={`https://babyshopnepal.test/public/uploads/frontend/thumb/${firstImage.filename}`} />
                    </Link>
                    { cartContext.isInWishlist(product) ?
                        <span className='btn-wishlist'
                                onClick={() => (cartContext.removeItem(product.id, 'wishlist'))}>
                            <i className="ri-heart-fill ri-lg"></i>
                        </span> :
                        <span className='btn-wishlist'
                                onClick={() => (cartContext.insertItem(product, 'wishlist'))}>
                            <i className="ri-heart-add-line ri-lg"></i>
                        </span>
                    }

                    </div>
                    { cartContext.isInCart(product) ?
                        <button className='btn btn-success btn-block btn-sm add-to-cart'
                                onClick={() => (cartContext.removeItem(product.id))}>
                            <i className="ri-shopping-cart-2-fill"></i> In Cart
                        </button> :
                        <button className='btn btn-success btn-block btn-sm add-to-cart'
                                onClick={() => (cartContext.insertItem(product))}>
                            <i className="ri-shopping-cart-2-line"></i> Add to cart
                        </button>
                    }
                    <Link to={`/product/${product.id}`} >
                        <h3>{product.name}</h3>
                    </Link>
                </div>
            </div>

    )
}

export default SingleProduct