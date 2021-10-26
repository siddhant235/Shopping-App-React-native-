import React from 'react'
import {FlatList,Button,Platform} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector,useDispatch } from 'react-redux'
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products'
const UserProduct = (props) => {
    const userProducts=useSelector(state=>state.products.userProducts)
    const dispatch=useDispatch();
    return (
        <>
        <FlatList data={userProducts} keyExtractor={item=>item.id} renderItem={itemdata=><ProductItem image={itemdata.item.imageUrl} title={itemdata.item.title}
    price={itemdata.item.price} onSelect={()=>{}}>
        <Button
            color={Colors.primary}
            title="Edit"
            onPress={()=>{}}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={()=>dispatch(productsActions.deleteProduct(itemdata.item.id))
          
            }
          ></Button>    
    
    </ProductItem>}/>
        </>
    )
}
UserProduct.navigationOptions=navData=>{
    return{
        headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName={Platform.OS==='android'?"md-menu":'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}}/>
      </HeaderButtons>,
       
    }
    
}

export default UserProduct
