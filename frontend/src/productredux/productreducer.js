import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS, USER_PRODUCTADD_FAIL, USER_PRODUCTADD_REQUEST, USER_PRODUCTADD_SUCCESS } from "./productconstant"

export const productAddReducer=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_PRODUCTADD_REQUEST : 
            return {loading : true}
        case USER_PRODUCTADD_SUCCESS : 
            return {loading : false ,messageSuccess : "Product added!"}
        case USER_PRODUCTADD_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }

 export const productGetReducer = (state={}, action) => {
    switch (action.type) {
        case GET_PRODUCT_REQUEST : 
        return {loading : true}
      case GET_PRODUCT_SUCCESS:
        return {
          products: action.payload,
        };
      default:
        return state;
    }
  };