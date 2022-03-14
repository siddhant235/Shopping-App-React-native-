import React,{useState} from "react";
import { compose,createStore, combineReducers,applyMiddleware } from "redux";
import { Provider } from "react-redux";
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import producReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart'
import ShopNavigator from "./navigation/ShopNavigator";
import OrderReducer from './store/reducers/Orders'
import ReduxThunk from 'redux-thunk'
import authReducer from './store/reducers/auth'
import AppNavigator from "./navigation/AppNavigator";
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
  handleNotification:async()=>{
    return {
      shouldShowAlert:true
    }
  }
})
const rootReducer = combineReducers({
  products: producReducer,
  cart:cartReducer,
  order:OrderReducer,
  auth:authReducer
});

const store = createStore(rootReducer,applyMiddleware(ReduxThunk));
const fetchFonts=()=>{
  return Font.loadAsync({
    'open-sans':require('./assets/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/OpenSans-Bold.ttf')
  })
}
export default function App() {
  const [fontLoaded,setFontLoaded]=useState(false)
  if(!fontLoaded){
    return <AppLoading startAsync={fetchFonts} onFinish={()=>{
      setFontLoaded(true)
    }}
    onError={console.warn}/>
  }
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}
