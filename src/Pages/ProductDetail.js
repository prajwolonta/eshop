import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import HtmlParser from "react-html-parser";
import axios from 'axios'
import Reviews from './Partials/Reviews'
import {useHistory} from 'react-router-dom'
import {AppContext} from "../Contexts/AppContext"
import 'remixicon/fonts/remixicon.css'

const ProductDetail = (props) => {
    const history = useHistory()
    const {productId} = useParams()
    const [loading, setLoading] = useState(true)
    const [productDetail, setProductDetails] = useState({})

    const cartContext = useContext(AppContext)

    useEffect(() => {
        axios.get("https://babyshopnepal.test/api/product/" + productId)
            .then(response => {
                // console.log(response.data)
                setProductDetails(response.data)
                setLoading(false)
                console.log(response.data.images)
            })
            .catch(error => console.log(error))
    }, [productId])


    return (
        <div className='single-product'>
            <div>
                <button onClick={()=>history.goBack()} className="btn btn-outline-dark">Go back</button>
            </div>
            {loading ?
                <div className="loading"> loading </div> :
                <>
                    {
                        productDetail.images.map((image)=>{
                            return <img alt=""
                                        width={200}
                                        key={`image_${image.image_id}`}
                                        src={`https://babyshopnepal.test/public/uploads/frontend/full/${image.filename}`} />
                        })
                    }

                    <h2>{productDetail.name}</h2>
                    <p>NPR. {productDetail.price}</p>
                    <div className="btn-toolbar">
                        { cartContext.isInCart(productDetail) ?
                            <button className='btn btn-success btn-sm add-to-cart mr-2'
                                    onClick={() => (cartContext.removeItem(productDetail.id))}>
                                <i className="ri-shopping-cart-2-fill"></i> In Cart
                            </button> :
                            <button className='btn btn-success btn-sm add-to-cart mr-2'
                                    onClick={() => (cartContext.insertItem(productDetail))}>
                                <i className="ri-shopping-cart-2-line"></i> Add to cart
                            </button>
                        }
                        { cartContext.isInWishlist(productDetail) ?
                            <button className='btn btn-danger btn-sm btn-wishlist'
                                    onClick={() => (cartContext.removeItem(productDetail.id, 'wishlist'))}>
                                <i className="ri-heart-fill"></i> In Wishlist
                            </button> :
                            <button className='btn btn-danger btn-sm btn-wishlist'
                                    onClick={() => (cartContext.insertItem(productDetail, 'wishlist'))}>
                                <i className="ri-heart-add-line"></i> Add to Wishlist
                            </button>
                        }
                    </div>
                    <div className='desc'>{HtmlParser(productDetail.description)}</div>
                    <Reviews reviews={productDetail.reviews} />

                </>
            }
        </div>
    )
}

export default ProductDetail