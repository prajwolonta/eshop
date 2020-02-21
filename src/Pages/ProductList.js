import React, {useEffect, useState, Suspense} from 'react'
import { useParams } from 'react-router-dom'

import HtmlParser from "react-html-parser";
import axios from 'axios'

const SingleProduct = React.lazy(()=> import('./Partials/SingleProduct'))

const ProductList = ()=>{
    const { categoryId } = useParams()
    const [productLists, setProductLists] = useState([])
    const [category, setCategory] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        axios.get('https://babyshopnepal.test/api/category/'+categoryId)
            .then(response=>response.data)
            .then(response=>setCategory(response))
            .then(()=>{
                axios.get('https://babyshopnepal.test/api/category/' + categoryId +'/products')
                    .then(response=>{
                        setProductLists(response.data)
                        setTimeout(()=>{
                            setLoading(false)
                        }, 1)
                    })
                    .catch((error) => console.log(error))
            })
            .catch(error=>console.log(error))


    }, [categoryId])



    const products = productLists.map(product => {
        return <SingleProduct key={product.id} product={product}/>
    })
    return (
        <>
            {
                loading ?
                    <div className="loading">Loading</div> :
                    <>
                        <div className="row">
                            <div className="col-12">
                                <div className="category-details">
                                    <h1>{ category.name }</h1>
                                </div>
                            </div>
                        </div>
                        <div className="row product-list">
                            <Suspense fallback="loading">
                                { products }
                            </Suspense>
                        </div>
                        <div className='desc'>{ HtmlParser(category.description) }</div>
                    </>
            }
        </>
    )
}

export default ProductList