import React from "react";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import producReducer from "./store/reducers/products";
import ShopNavigator from "./navigation/ShopNavigator";
const rootReducer = combineReducers({
  products: producReducer,
});
const store = createStore(rootReducer);
export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}
