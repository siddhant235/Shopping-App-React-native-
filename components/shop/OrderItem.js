import React,{useState} from 'react';
import {View,Text,Button,StyleSheet} from 'react-native'
import CartItem from './CartItem'
import Colors from '../../constants/Colors'
const OrderItem=props=>{
    const [showDetails,setShowDetails]=useState(false)
    return (
    <View style={styles.orderItem}>
<View style={styles.summary}>
    <Text style={styles.totalAmount}>{props.amount.toFixed(2)}</Text>
    <Text style={styles.date}>{props.date}</Text>
</View>
<Button color={Colors.primary} style={styles.button} title="Show Details" onPress={()=>{
    setShowDetails(prevState=>!prevState)
}}/>
{showDetails && <View  style={styles.detailItems}>
    
    {props.items.map(cartItem=><CartItem key={cartItem.productId} quantity={cartItem.quantity} amount={cartItem.productPrice} title={cartItem.productTitle}/>)}
    </View>}
        </View>)
}
const styles=StyleSheet.create({
orderItem:{
    shadowColor:'black',
    shadowOpacity:0.1,
    shadowOffset:{width:0,height:2},
    shadowRadius:2,
    elevation:2,
    borderRadius:10,
    margin:20,
    padding:20,
    alignItems:'center'
},
summary:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    width:'100%',
    marginBottom:15


},
totalAmount:{
    fontFamily:'open-sans-bold',
    fontSize:16
},
date:{
    fontSize:16,
    fontFamily:'open-sans',
    color:'#888'
},
detailItems:{
    width:"100%"
}
})
export default OrderItem