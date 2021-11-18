import React from 'react'
import {View,Text,Image,StyleSheet,TouchableOpacity,TouchableNativeFeedback,Platform} from 'react-native'
import Card from '../UI/Card';
const ProductItem = (props) => {
    let TouchableCmp=TouchableOpacity;
    if(Platform.OS==='android' && Platform.Version>=21)
    {
        TouchableCmp=TouchableNativeFeedback
    }
 return<Card style={styles.product}>
     <View style={styles.touchable}>
     <TouchableCmp onPress={props.onSelect} useForeground>
         <View>
     <View style={styles.imageContainer}>
     <Image style={styles.image} source={{uri:props.image}}/>
     </View>
     <View style={styles.details}>
     <Text style={styles.title}>{props.title}</Text>
     <Text style={styles.price}>${props.price.toFixed(2)}</Text>
     </View>
     <View style={styles.actions}>
       {props.children}
     </View>
     </View>
     </TouchableCmp>
     </View>
 </Card>
}
const styles=StyleSheet.create({
    touchable:{
        overflow:'hidden',
        borderRadius:10
    },
product:{
  
    height:250,
    margin:20,

},
image:{
    width:"100%",
    height:'60%'
},
title:{
    fontSize:18,
    fontFamily:'open-sans-bold',
    marginVertical:2
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
