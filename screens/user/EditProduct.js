import React,{useState,useEffect,useCallback} from 'react'
import {View,Text,StyleSheet,ScrollView,TextInput,Platform,Alert} from 'react-native'
import {HeaderButtons,Item } from "react-navigation-header-buttons";
import * as actions from '../../store/actions/products'
import HeaderButton from "../../components/UI/HeaderButton";
import { useSelector,useDispatch } from 'react-redux';
const EditProduct = (props) => {
    const dispatch=useDispatch();
    const prodId=props.navigation.getParam('productId');
    const editedProduct=useSelector(state=>state.products.userProducts.find(prod=>prod.id===prodId))
    const [title,setTitle]=useState(editedProduct?editedProduct.title:'');
    const [titleIsValid,setTitleIsValid]=useState(false)
    const [imageUrl,setImageUrl]=useState(editedProduct?editedProduct.imageUrl:'');
    const [price,setPrice]=useState('');
    const [description,setdescription]=useState(editedProduct?editedProduct.description:'')
    

  const submitHandler=useCallback(()=>{
     if(!titleIsValid){
         Alert.alert('Wrong Input','Please check the errors',[{
             text:"okay"
         }])
        return; 
     }
     if(editedProduct){
         dispatch(actions.updateProduct(prodId,title,description,imageUrl))
     }else{
         dispatch(actions.createProduct(title,description,imageUrl,+price))
     }
  },[dispatch,prodId,imageUrl,title,price,description])

  useEffect(()=>{
      props.navigation.setParams({submit:submitHandler})
  },[submitHandler])
  
  const titleChangeHandler=(text)=>{
      if(text.trim().length<=0)
      {
         setTitleIsValid(false) 
      }else{
          setTitleIsValid(true)
      }
 setTitle(text)
  }
    return (
        <>
        <ScrollView>
            <View style={styles.form}>
           <View style={styles.formControl}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.input} value={title} autoCapitalize="sentences" onEndEditing={()=>console.log("onEndEditing")} onSubmitEditing={()=>console.log("onSubmitEditing")} autoCorrect returnKeyType="next" onChangeText={titleChangeHandler}/>       
        {!titleIsValid && <Text>Please enter a valid title!</Text>}
        </View> 
        <View style={styles.formControl}>
        <Text style={styles.label}>Image URL</Text>
        <TextInput style={styles.input} value={imageUrl} onChangeText={text=>setImageUrl(text)}/>       
        </View> 
      { editedProduct?null: <View style={styles.formControl}>
        <Text style={styles.label}>Price</Text>
        <TextInput style={styles.input} value={price} keyboardType="decimal-pad" onChangeText={text=>setPrice(text)}/>       
        </View>} 
        <View style={styles.formControl}>
        <Text style={styles.label}>Description</Text>
        <TextInput style={styles.input} value={description} onChangeText={text=>setdescription(text)}/>       
        </View> 
        </View>
        </ScrollView>
        </>
    )
}
EditProduct.navigationOptions=navData=>{
    const submitFn=navData.navigation.getParam('submit');

    return{
        headerTitle:navData.navigation.getParam('productId')?'Edit Product':'Add Product',
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item title='Save' iconName={Platform.OS==='android'?"md-checkmark":'ios-checkmark'} onPress={submitFn}/>
      </HeaderButtons>
    }
}
const styles=StyleSheet.create({
   form:{
       margin:20
   },
   formControl:{
       width:'100%'
   },
   label:{
       fontFamily:'open-sans-bold',
       marginVertical:8
   },
   input:{
       paddingHorizontal:2,
       paddingVertical:5,
       borderBottomColor:'#ccc',
       borderBottomWidth:1
   }
})
export default EditProduct
