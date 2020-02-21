import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'
import axios from "axios"
import {isEmpty} from "lodash"

const Search = ()=>{
    const [searchResult, setSearchResult] = useState([])
    const [searchKeyword, setSearchKeyword] = useState("")
    useEffect(()=>{
        if(searchKeyword !== ""){
            axios.get("https://babyshopnepal.test/api/search",
                {
                    params: {'keyword': searchKeyword}
                })
                .then(response =>response.data)
                .then(data => {
                    console.log(data, data.products.length)
                    setSearchResult(data)
                })
        } else{
            setSearchResult([])
        }
    }, [searchKeyword])

    const updateResult = (e)=>{
        setSearchKeyword(e.target.value)
    }

    const clearSearchResults = ()=>{
        setSearchResult([])
        setSearchKeyword('')
    }

    return (

        <div className="search">
            <h2>Search</h2>
            <div className="search-bar">
                <div className="form-group">
                    <label htmlFor="search">Search Anything</label>
                    <input type="text" className="form-control" value={searchKeyword} onChange={(e)=>updateResult(e)}/>
                </div>
            </div>
            {
                !isEmpty(searchResult) &&
                <div className="search-results">
                    <button onClick={clearSearchResults} className="btn btn-sm btn-danger">Clear Search Results</button>
                    {
                        !isEmpty(searchResult.products) &&
                        <div className="search-product-results">
                            <h4>Products</h4>
                            { searchResult.products.map(product => {
                                    return (
                                        <div key={`search_prod_${product.id}`} className="row search-result-product-item">
                                            <div className="col-3"><img width={50} src={`https://babyshopnepal.test/public/uploads/frontend/thumb/${product.images[0].filename}`} alt={product.name}/></div>
                                            <div className="col-9"><Link to={`/product/${product.id}`}>{product.name}</Link></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    }
                    <hr/><hr/>
                    {
                        !isEmpty(searchResult.categories) &&
                        <div className="search-categories-result">
                            <h4>Categories</h4>
                            { searchResult.categories.map(category => {
                                return (
                                    <p key={`search_cat_${category.id}`}><Link to={`/category/${category.id}`}>{category.name}</Link></p>
                                )
                            })
                            }
                        </div>
                    }
                </div>
            }

        </div>


    )
}

export default Search