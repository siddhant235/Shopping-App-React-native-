import React,{useState} from 'react'
import { View,Text,FlatList,StyleSheet,Button,ActivityIndicator } from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import * as cartAction from '../../store/actions/cart' 
import * as orderAction from '../../store/actions/orders'
import Colors from '../../constants/Colors'
import CartItem from '../../components/shop/CartItem'
import Card from '../../components/UI/Card'
const CartScreen=(props)=>{
    const [isLoading,setIsLoading]=useState(false)
    const cartTotalAmount=useSelector(state=>state.cart.totalAmount)
    const dispatch = useDispatch()
    const cartItems=useSelector(state=>{
        const transformedCartItems=[];
        for(const key in state.cart.items){
            transformedCartItems.push({
                productId:key,
                productTitle:state.cart.items[key].productTitle,
                productPrice:state.cart.items[key].productPrice,
                quantity:state.cart.items[key].quantity,
                sum:state.cart.items[key].sum,
                productPushToken:state.cart.items[key].pushToken
            })
        }
        return transformedCartItems.sort((a,b)=>a.productId>b.productId?1:-1);
    })
    const sendOrderHandler=async()=>{
        setIsLoading(true)
        await dispatch(orderAction.addOrder(cartItems,cartTotalAmount))
        setIsLoading(false)
    }
    return <View style={styles.screen}>
        <Card style={styles.summary}>
            <Text style={styles.summaryText}>Total: <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2)*100)/100}</Text></Text>
           {isLoading?<ActivityIndicator size="small" color={Colors.primary} />: <Button title="Order Now"  disabled={cartItems.length===0} onPress={sendOrderHandler}/>}
           
        </Card>
        <FlatList
        data={cartItems}
        keyExtractor={item=>item.productId}
        renderItem={itemData=><CartItem quantity={itemData.item.quantity}
        title={itemData.item.productTitle}
        amount={itemData.item.sum}
        deletable
        onRemove={()=>{
            dispatch(cartAction.removeFromCart(itemData.item.productId))
        }}/>}
        />
    </View>
}
export const screenOptions ={
    headerTitle:'Your Cart'
}
const styles=StyleSheet.create({
screen:{
margin:20,

},
summary:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:20,
    padding:10,
},
summaryText:{
    fontFamily:'open-sans-bold',
    fontSize:18

},
amount:{
    color:Colors.primary
}
})
export default CartScreen