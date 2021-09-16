import React from "react";
import { FlatList, Platform, Text ,Button} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import * as CartActions from "../../store/actions/cart";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import Colors from "../../constants/Colors";
const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const cart = useSelector((state) => state.cart.items);
  const selectItemHandler = (id,title) => {
    props.navigation.navigate("ProductDetail", {
      productId: id,
      productTitle: title,
    });
  };
  const dispatch = useDispatch();
  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item.id}
      renderItem={(itemData) => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          onSelect={() => {selectItemHandler(itemData.item.id,itemData.item.title)}}
         
          price={itemData.item.price}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => {selectItemHandler(itemData.item.id,itemData.item.title)}}
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
