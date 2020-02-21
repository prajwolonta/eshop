import React, {createContext, useState, useEffect} from 'react'

const AppContext = createContext()

const AppContextProvider = (props)=>{
    const localCart = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
    const localWishlist = localStorage.getItem('wishlistItems') ? JSON.parse(localStorage.getItem('wishlistItems')) : []

    const [cartItems, setCartItems] = useState(localCart)
    const [wishlistItems, setWishlistItems] = useState(localWishlist)

    useEffect(()=>{
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    },[cartItems])

    useEffect(()=>{
        localStorage.setItem('wishlistItems', JSON.stringify(wishlistItems))
    },[wishlistItems])

    const clearAllItems= (type='cart')=>{
        // const result = window.confirm('Are you sure?')
        // if(result) {
            // console.log(type)
            if(type==='cart'){
                // console.log('helloooo')
                setCartItems([])
            }
            else{
                // console.log('thereeee')
                setWishlistItems([])
            }

        // }
    }

    const insertItem = ( item, type='cart')=>{
        if(type === 'cart'){
            setCartItems((cartItems)=>{
                return [
                    ...cartItems,
                    item
                ]
            })
        }else{
            setWishlistItems((cartItems)=>{
                return [
                    ...cartItems,
                    item
                ]
            })
        }
    }

    const updateQty = (event, itemId)=>{
            const updatedCartItems = cartItems.map(item =>{
                if(item.id === itemId){
                    item.qty = event.target.value === '' ? 0 : parseInt(event.target.value)
                }
                return item
            })
            setCartItems(updatedCartItems)
    }

    const removeItem = (itemId, type='cart')=>{
        // const result = window.confirm('Are you sure?')
        // if(result){
            if(type === 'cart'){
                setCartItems((cartItems)=>{
                    return cartItems.filter((item)=>(parseInt(item.id) !== parseInt(itemId)))
                })
            }else{
                setWishlistItems((wishlistItems)=>{
                    return wishlistItems.filter((item)=>(parseInt(item.id) !== parseInt(itemId)))
                })
            }

        // }
    }

    const totalCartItems = cartItems.length

    const totalWishlistItems = wishlistItems.length

    const isInCart = (product) =>{
        return cartItems.some((item) => item.id === product.id)
    }

    const isInWishlist = (product) =>{
        return wishlistItems.some((item) => item.id === product.id)
    }

    const value = {
        cartItems,
        wishlistItems,
        clearAllItems,
        insertItem,
        removeItem,
        totalCartItems,
        totalWishlistItems,
        updateQty,
        isInCart,
        isInWishlist
    }



    return (
        <AppContext.Provider value={value}>
            { props.children }
        </AppContext.Provider>
    )
}

export {AppContextProvider, AppContext}