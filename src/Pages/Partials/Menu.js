import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'

const Menu = ()=>{
    const [categoryLists, setCategoryLists] = useState([])

    useEffect(()=>{
        axios.get('https://babyshopnepal.test/api/categories?fields=name,id,slug,menu_id')
            .then(response=>response.data)
            .then(response=>setCategoryLists(response))
            .catch(error=>console.log(error))
    }, [])

    const Categories = categoryLists.map(cat => {
        return <li key={`cat_${cat.id}`}>
                <Link to={`/category/${cat.id}`}>
                    { cat.name }
                </Link>
        </li>
    })
    return (

            <>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        { Categories }
                        {/*<li>*/}
                        {/*    <Link to="/category">Category</Link>*/}
                        {/*    <ul>*/}
                        {/*        */}
                        {/*    </ul>*/}
                        {/*</li>*/}
                    </ul>

                </nav>
            </>

    )
}

export default Menu