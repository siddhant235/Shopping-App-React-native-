import PRODUCTS from "../../data/dummy-data";
import Product from "../../models/product";
import { DELETE_PRODUCT,CREATE_PRODUCT,UPDATE_PRODUCT } from "../actions/products";
const initialState={
    availableProducts:PRODUCTS,
    userProducts:PRODUCTS.filter(prod=>prod.ownerId==='u1')
}

export default (state=initialState,action)=>{
    switch(action.type){
        case DELETE_PRODUCT:
            return{
                ...state,
                userProducts:state.userProducts.filter(product=>product.id!==action.pid),
                availableProducts:state.availableProducts.filter(product=>product.id!==action.pid),
            }
            case CREATE_PRODUCT:
            const newProduct=new Product(new Date().toString(),'u1',action.productData.title,action.productData.imageUrl,action.productData.description,
            action.productData.price)    
            return{
               ...state,
               availableProducts:state.availableProducts.concat(newProduct),
               userProducts:state.userProducts.concat(newProduct)
                }
                case UPDATE_PRODUCT:
                    const productIndex=state.userProducts.findIndex(prod=>prod.id==action.productData.pid)
                    const updatedProduct=new Product(action.productData.pid,state.userProducts[productIndex].ownerId,action.productData.title,action.productData.imageUrl,
                        action.productData.description,state.userProducts[productIndex].price)
                        const updatedUserProducts=[...state.userProducts];
                        updatedUserProducts[productIndex]=updatedProduct;
                        const availableProductsIndex=state.availableProducts.findIndex(prod=>prod.id===action.productData.pid)
                        const  updatedAvailableProducts=[...state.availableProducts];
                        updatedAvailableProducts[availableProductsIndex]=updatedProduct
                        return{
                            userProducts:updatedUserProducts,
                            availableProducts:updatedAvailableProducts  
                        }
    }
    return state;
}