import React from 'react'
import {createAppContainer,createSwitchNavigator} from 'react-navigation'
import { Platform } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import ProductOverview from '../screens/shop/ProductOverView'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen  from '../screens/shop/OrdersScreen'
import { Ionicons } from '@expo/vector-icons';
import UserProductScreen from '../screens/user/UserProduct';
import EditProductScreen from '../screens/user/EditProduct';
import AuthScreen from '../screens/user/AuthScreen';
const defaultNavOptions={
    headerStyle:{
        backgroundColor:Platform.OS==='android'?Colors.primary:''
    },
    headerTitleStyle:{
fontFamily:'open-sans-bold'
    },
    headerBackTitle:{
fontFamily:'open-sans'
    },
    headerTintColor:Platform.OS==='android'?'white':Colors.primary
}
const ProductsNavigator=createStackNavigator({
ProductsOverview:ProductOverview,
ProductDetail:ProductDetailScreen,
Cart:CartScreen
},{  navigationOptions:{
    drawerIcon:drawerConfig=>(
    <Ionicons name={Platform.OS==='android'?'md-cart':'ios-cart'} 
    size={23} style={{marginTop:70}} color={drawerConfig.tintColor}/>) 
 },
    defaultNavigationOptions:defaultNavOptions
})
const OrdersNavigator=createStackNavigator({Orders:OrdersScreen},
    {
    navigationOptions:{
       drawerIcon:drawerConfig=>(
       <Ionicons name={Platform.OS==='android'?'md-list':'ios-list'} 
       size={23} color={drawerConfig.tintColor}/>) 
    },
        defaultNavigationOptions:defaultNavOptions})

const AdminNavigator=createStackNavigator(
            {UserProduct:UserProductScreen,EditProduct:EditProductScreen},
            {
            navigationOptions:{
               drawerIcon:drawerConfig=>(
               <Ionicons name={Platform.OS==='android'?'md-create':'ios-create'} 
               size={23} color={drawerConfig.tintColor}/>) 
            },
                defaultNavigationOptions:defaultNavOptions})

const ShopNavigator=createDrawerNavigator({
        Products:ProductsNavigator,
        Orders:OrdersNavigator,
        Admin:AdminNavigator
    },{
        contentOptions:{
            activeTintColor:Colors.primary
        }
    })
const AuthNavigator=createStackNavigator({
    Auth:AuthScreen
},{
    defaultNavigationOptions:defaultNavOptions
})
    const MainNavigator=createSwitchNavigator({
        Auth:AuthNavigator,
        Shop:ShopNavigator
    })
export default createAppContainer(MainNavigator)