import React from "react";
import { FlatList, Text } from "react-native";
import { useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
const ProductOverView = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
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
          onAddToCart={()=>{}}
          price={itemData.item.price}
        />
      )}
    />
  );
};
ProductOverView.navigationOptions = {
  headerTitle: "All Products",
};
export default ProductOverView;
