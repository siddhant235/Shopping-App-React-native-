import React from 'react'
import {ScrollView,View,Text,Image,Button,StyleSheet} from 'react-native'
import {useSelector,useDispatch} from 'react-redux'
import Colors from '../../constants/Colors'
import * as CartActions from '../../store/actions/cart'
const ProductDetailScreen = (props) => {
    const productId=props.route.params.productId;
    const dispatch=useDispatch()
    const selectedProduct=useSelector(state=>state.products.availableProducts.find(prod=>prod.id==productId))
    return (<ScrollView>
        <Image style={styles.image} source={{uri:selectedProduct.imageUrl}}/>
        <View style={styles.actions}>
        <Button color={Colors.primary} title="Add To Cart" onPress={()=>{dispatch(CartActions.addToCart(selectedProduct))}}/>
        </View>
        <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
        <Text style={styles.description}>{selectedProduct.description}</Text>
        </ScrollView>
        )
}
export const screenOptions=navData=>{
return {
    headerTitle:navData.route.params.productTitle
}
}
const styles=StyleSheet.create({
image:{
    width:'100%',
    height:300

},
price:{
    fontSize:30,
    color:'#888',
    textAlign:'center',
    marginVertical:20
},
description:{
    fontSize:14,
    fontFamily:'open-sans',
    textAlign:'center',
    marginHorizontal:20
},
actions:{
    marginVertical:10,
    alignItems:"center"
}
})
export default ProductDetailScreen
