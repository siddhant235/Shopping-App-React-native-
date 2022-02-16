import React,{useEffect} from 'react'
import {View,ActivityIndicator,StyleSheet} from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";
import Colors from '../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../store/actions/auth'
const StartupScreen = (props) => {
 const dispatch=useDispatch()
    useEffect(()=>{
      const tryLogin=async()=>{
          const userData=await AsyncStorage.getItem('userData')
          if(!userData){
              props.navigation.navigate('Auth');
              return;
          }   
          
          const transformedData=JSON.parse(userData)
          const {token,userId,expirationDate}=transformedData
          console.log(transformedData)
       const  expiryDate=new Date(expirationDate);
          if(expiryDate<=new Date()|| !token || !userId){
              return ;
          }
          const expirationTime=expiryDate.getTime()-new Date().getTime()
          props.navigation.navigate('Shop')
          dispatch(authActions.authenticate(userId,token,expirationTime))
        }
      tryLogin()
    },[dispatch])
  return (
   <View styles={styles.screen}>
       <ActivityIndicator size="large" color={Colors.primary}/>
   </View>
  )
}

const styles=StyleSheet.create({
    screen:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})
export default StartupScreen