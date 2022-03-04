import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator,DrawerItemList } from "@react-navigation/drawer";
import { Platform, SafeAreaView, Button, View } from "react-native";
import { useDispatch } from "react-redux";
import ProductOverview, {
  screenOptions,
} from "../screens/shop/ProductOverView";
import ProductDetailScreen, {
  screenOptions as ProductDetailOptions,
} from "../screens/shop/ProductDetailScreen";
import Colors from "../constants/Colors";
import CartScreen, {
  screenOptions as CartOptions,
} from "../screens/shop/CartScreen";
import OrdersScreen, {
  screenOptions as OrdersOptions,
} from "../screens/shop/OrdersScreen";
import { Ionicons } from "@expo/vector-icons";
import UserProductScreen, {
  screenOptions as UserOptions,
} from "../screens/user/UserProduct";
import EditProductScreen, {
  screenOptions as EditOptions,
} from "../screens/user/EditProduct";
import AuthScreen,{screenOptions as AuthOptions} from "../screens/user/AuthScreen";
import * as authActions from "../store/actions/auth";
const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === "android" ? Colors.primary : "",
  },
  headerTitleStyle: {
    fontFamily: "open-sans-bold",
  },
  headerBackTitle: {
    fontFamily: "open-sans",
  },
  headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
};
const ProductsStackNavigator = createStackNavigator();
export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductOverview}
        options={screenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={ProductDetailOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={CartOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersStackNavigator = createStackNavigator();
export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={OrdersOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export const AdminStackNavigator = createStackNavigator();
const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <AdminStackNavigator.Screen
        name="UserProduct"
        component={UserProductScreen}
        options={UserOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

 const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
  const dispatch=useDispatch()
  return (
    <ShopDrawerNavigator.Navigator drawerContent={props=>{
                 
                    return <View style={{flex:1}}>
                        <SafeAreaView forceInset={{top:'always',horizontal:'never'}}>
                          <DrawerItemList {...props}/>
                          <Button title="Logout" color={Colors.primary} onPress={()=>{
                              dispatch(authActions.logout())
                            //   props.navigation.navigate('Auth')
                          }}/>
                        </SafeAreaView>
                    </View>
                }} drawerContentOptions={{
                    activeTintColor:Colors.primary
                }}>
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              style={{ marginTop: 10 }}
              color={props.tintColor}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={props.tintColor}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={props.tintColor}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};
const AuthStackNavigator=createStackNavigator()
export const AuthNavigator=()=>{
    return(
        <AuthStackNavigator.Navigator screenOptions={defaultNavOptions}>
            <AuthStackNavigator.Screen name="Auth" component={AuthScreen} options={AuthOptions}/>
        </AuthStackNavigator.Navigator>
    )
}
// const AuthNavigator=createStackNavigator({
//     Auth:AuthScreen
// },{
//     defaultNavigationOptions:defaultNavOptions
// })
//     const MainNavigator=createSwitchNavigator({
//         Startup:StartupScreen,
//         Auth:AuthNavigator,
//         Shop:ShopNavigator
//     })
// export default MainNavigator
