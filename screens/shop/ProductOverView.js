import React from "react";
import { FlatList, Platform, Text } from "react-native";
import { useSelector ,useDispatch} from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from '../../store/actions/cart'
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cart=useSelector((state)=>state.cart.items)
  console.log("cart",cart)
  const dispatch=useDispatch()
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onViewDetails={()=>{
              props.navigation.navigate('ProductDetail',{productId:itemData.item.id,productTitle:itemData.item.title})
          }}
          onAddToCart={()=>{
            dispatch(CartActions.addToCart(itemData.item))
          }}
          price={itemData.item.price}
        />
      )}
    />
  );
};
ProductOverView.navigationOptions = navData=>{
  return{
  headerTitle: "All Products",
  headerRight:<HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item title='Cart' iconName={Platform.OS==='android'?"md-cart":'ios-cart'} onPress={()=>{navData.navigation.navigate('Cart')}}/>
  </HeaderButtons>
  }
};
export default ProductOverView;
