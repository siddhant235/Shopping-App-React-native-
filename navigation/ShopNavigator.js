import {createAppContainer} from 'react-navigation'
import { Platform } from 'react-native'
import {createStackNavigator} from 'react-navigation-stack'
import ProductOverview from '../screens/shop/ProductOverView'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import Colors from '../constants/Colors'

const ProductsNavigator=createStackNavigator({
ProductsOverview:ProductOverview,
ProductDetail:ProductDetailScreen
},{
    defaultNavigationOptions:{
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
})
export default createAppContainer(ProductsNavigator)