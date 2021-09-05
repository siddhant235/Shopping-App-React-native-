

export const ADD_ORDER="ADD_ORDER"
export const addOrder=(CartItems,totalAmount)=>{
 return {
     type:ADD_ORDER,
     orderData:{
         items:CartItems,amount:totalAmount
     }
 }
}