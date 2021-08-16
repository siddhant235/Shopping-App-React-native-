import React from 'react'
import {View,Text,Image,StyleSheet, Button,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native'
import Colors from '../../constants/Colors'
const ProductItem = (props) => {
    let TouchableCmp=TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21)
    {
        TouchableCmp=TouchableNativeFeedback
    }
 return<View style={styles.product}>
     <View style={styles.touchable}>
     <TouchableCmp onPress={props.onViewDetails} useForeground>
         <View>
     <View style={styles.imageContainer}>
     <Image style={styles.image} source={{uri:props.image}}/>
     </View>
     <View style={styles.details}>
     <Text style={styles.title}>{props.title}</Text>
     <Text style={styles.price}>${props.price.toFixed(2)}</Text>
     </View>
     <View style={styles.actions}>
         <Button color={Colors.primary} title="View Details" onPress={props.onViewDetails}></Button>
         <Button color={Colors.primary} title="To cart" onPress={props.onAddToCart}></Button>
     </View>
     </View>
     </TouchableCmp>
     </View>
 </View>
}
const styles=StyleSheet.create({
    touchable:{
        overflow:'hidden',
        borderRadius:10
    },
product:{
    shadowColor:'black',
    shadowOpacity:0.26,
    shadowOffset:{width:0,height:2},
    shadowRadius:8,
    elevation:5,
    borderRadius:10,
    backgroundColor:'white',
    height:300,
    margin:20,

},
image:{
    width:"100%",
    height:'60%'
},
title:{
    fontSize:18,
    marginVertical:4
},
price:{
    fontSize:14,
    color:"#888"
},
actions:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:"center",
    height:'25%',
    paddingHorizontal:20
},
details:{
    alignItems:'center',
    height:'15%',
    padding:10
},
imageContainer:{
    height:'60%',
    width:'100%',
    borderTopLeftRadius:10,
    borderTopRightRadius:10,
   
}
})
export default ProductItem