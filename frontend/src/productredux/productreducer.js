import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS } from "./productconstant"

export const productAddReducer=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case PRODUCT_ADD_REQUEST : 
            return {loading : true}
        case PRODUCT_ADD_SUCCESS : 
            return {loading : false ,messageSuccess : "Product added!"}
        case PRODUCT_ADD_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }