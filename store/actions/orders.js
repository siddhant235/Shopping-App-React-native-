
import Order from '../../models/order'
export const ADD_ORDER="ADD_ORDER"
export const SET_ORDERS='SET_ORDERS'
export const fecthOrders=()=>{
    return async (dispatch,getState)=>{
        const token=getState().auth.token
        try{
        const response=await fetch(`https://rn-first-fe6f9-default-rtdb.firebaseio.com/orders.json?auth=${token}`)
        console.log(response)
       if(!response.ok){
          throw new Error('Something went wrong!')
       }
         const resData=await response.json();
         console.log(resData)
         const loadedOrders=[];
         for(const key in resData){
             loadedOrders.push(new Order(key,resData[key].CartItems,resData[key].totalAmount,new Date(resData[key].date)))
         }
         dispatch({type:SET_ORDERS,orders:loadedOrders})
        }catch(err){
            throw err;
        }
        }
}
export const addOrder=(CartItems,totalAmount)=>{
    return async dispatch=>{
        const date=new Date()
        const response=await fetch("https://rn-first-fe6f9-default-rtdb.firebaseio.com/orders.json",{
           method:'POST',
           headers:{
               'Content-Type':'application/json'
           } ,
           body:JSON.stringify({CartItems,totalAmount,date:date.toISOString()})
        })
      
        const resData=await response.json();
        dispatch({
            type:ADD_ORDER,
            orderData:{
                id:resData.name,
                items:CartItems,amount:totalAmount,date:date
            }
        })
        if(!response.ok){
            throw new Error('Something Went Wring!')
        }
    }
 
}