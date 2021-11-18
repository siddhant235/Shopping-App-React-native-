import React from 'react'
import {FlatList,Button,Platform,Alert} from 'react-native'
import ProductItem from '../../components/shop/ProductItem'
import { useSelector,useDispatch } from 'react-redux'
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from '../../constants/Colors';
import * as productsActions from '../../store/actions/products'
const UserProduct = (props) => {
    const userProducts=useSelector(state=>state.products.userProducts)
    const dispatch=useDispatch();
    const  editProductHandler=(id)=>{
        props.navigation.navigate('EditProduct',{productId:id})
    }
        const deleteHandler=(id)=>{
   Alert.alert('Are you sure?','Do you really want to delete this item',[
       {
           text:'No',style:'defautl'
       },
       {
           text:'Yes',style:'destructive',onPress:()=>{dispatch(productsActions.deleteProduct(id))}
       }
   ])
    }
    return (
        <>
        <FlatList data={userProducts} keyExtractor={item=>item.id} renderItem={itemdata=><ProductItem image={itemdata.item.imageUrl} title={itemdata.item.title}
    price={itemdata.item.price} onSelect={()=>{editProductHandler(itemdata.item.id)}}>
        <Button
            color={Colors.primary}
            title="Edit"
            onPress={()=>{editProductHandler(itemdata.item.id)}}
          ></Button>
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={
()=>deleteHandler(itemdata.item.id)
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
      headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title='Menu' iconName={Platform.OS==='android'?"md-create":'ios-create'} onPress={()=>{navData.navigation.navigate('EditProduct')}}/>
    </HeaderButtons>
       
    }
    
}

export default UserProduct
