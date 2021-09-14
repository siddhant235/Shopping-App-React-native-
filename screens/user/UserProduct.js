import React from 'react'
import {FlatList} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector } from 'react-redux'
const UserProduct = (props) => {
    const userProducts=useSelector(state=>state.products.userProducts)
    // return 
    return (
        <>
        <FlatList data={userProducts} keyExtractor={item=>item.id} renderItem={itemdata=><ProductItem image={itemdata.item.imageUrl} title={itemdata.item.title}
    price={itemdata.item.price} onViewDetails={()=>{}} onAddToCart={()=>{}}/>}/>
        </>
    )
}

export default UserProduct
