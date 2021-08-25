import React,{useState} from "react";
import { compose,createStore, combineReducers,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import { Provider } from "react-redux";
import AppLoading from 'expo-app-loading'
import * as Font from 'expo-font'
import producReducer from "./store/reducers/products";
import cartReducer from './store/reducers/cart'
import ShopNavigator from "./navigation/ShopNavigator";

const rootReducer = combineReducers({
  products: producReducer,
  cart:cartReducer
});

const store = createStore(rootReducer);
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
      <ShopNavigator />
    </Provider>
  );
}
