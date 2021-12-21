import React, { useState, useEffect,useCallback } from "react";
import {
  View,
  FlatList,
  Platform,
  Text,
  Button,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart";
import * as productActions from "../../store/actions/products";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
import { isLoading } from "expo-font";
const ProductOverView = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRefreshing,setIsRefreshing]=useState(false)
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart.items);
  const selectItemHandler = (id, title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  const dispatch = useDispatch();
  const loadProducts = useCallback(async () => {
    setIsRefreshing(true)
    setError(null)
  
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false)
   
  },[dispatch,setError,setIsLoading]);
  useEffect(() => {
   setIsLoading(true)
    loadProducts().then(()=>setIsLoading(false));
  }, [dispatch]);
useEffect(()=>{
 const willFocusSub= props.navigation.addListener('willFocus',loadProducts)
  return ()=>{
    willFocusSub.remove()
  }
},[loadProducts])
  if(error)
  {
    return (
      <View style={styles.centered}>
       <Text>An Error Occured</Text>
       <Button title="Try Again" onPress={loadProducts} color={Colors.primary}/>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  if (!isLoading && products.length == 0) {
    return (
      <View style={styles.centered}>
        <Text>No Products found.Maybe start adding some.</Text>
      </View>
    );
  }
  return (
    <FlatList
     onRefresh={loadProducts}
     refreshing={isRefreshing}
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelect={() => {
            selectItemHandler(itemData.item.id, itemData.item.title);
          }}
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {
              selectItemHandler(itemData.item.id, itemData.item.title);
            }}
          ></Button>
          <Button
            color={Colors.primary}
            title="To cart"
            onPress={() => {
              dispatch(CartActions.addToCart(itemData.item));
            }}
          ></Button>
        </ProductItem>
      )}
    />
  );
};
const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
});
ProductOverView.navigationOptions = (navData) => {
  return {
    headerTitle: "All Products",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === "android" ? "md-cart" : "ios-cart"}
          onPress={() => {
            navData.navigation.navigate("Cart");
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default ProductOverView;
