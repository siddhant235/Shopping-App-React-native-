import React,{useEffect,useState} from 'react'
import Colors from '../../constants/Colors';
import {View,FlatList,Text,Platform,ActivityIndicator,StyleSheet} from 'react-native'
import { useSelector,useDispatch } from 'react-redux'
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import HeaderButton from "../../components/UI/HeaderButton";
import OrderItem from '../../components/shop/OrderItem';
import * as OrderActions from '../../store/actions/orders'
const OrdersScreen = (props) => {
    const dispatch=useDispatch();
    const [isLoading,setIsLoading]=useState(false);
    useEffect(()=>{
        setIsLoading(true)
        dispatch(OrderActions.fecthOrders()).then(()=>{
            setIsLoading(false)
        })
    },[dispatch])
    const orders=useSelector(state=>state.order.orders)
    if(isLoading){
        return <View style={styles.centred}><ActivityIndicator size="large" color={Colors.primary}/></View>
    }
    return <FlatList data={orders} keyExtractor={item=>item.id} renderItem={itemData=><OrderItem amount={itemData.item.totalAmount} date={itemData.item.readabledate} items={itemData.item.items} />}/>
}
OrdersScreen.navigationOptions=navData=>{
    return{
        headerTitle:'Your Orders',
        headerLeft:<HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Menu' iconName={Platform.OS==='android'?"md-menu":'ios-menu'} onPress={()=>{navData.navigation.toggleDrawer()}} />
      </HeaderButtons>
    }
   
}
const styles=StyleSheet.create({
    centred:{
        flex:1,
        justifyContent:'center',
        alignItems:"center"
    }
})
export default OrdersScreen
