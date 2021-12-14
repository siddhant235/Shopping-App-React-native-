

export const ADD_ORDER="ADD_ORDER"
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