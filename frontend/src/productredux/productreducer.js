import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS, PRODUCT_DETAIL_FAIL, PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS } from "./productconstant"
import { GET_PRODUCT_REQUEST, GET_PRODUCT_SUCCESS } from "./productconstant"

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

  export const productDetailReducer = (state={product : {}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAIL_REQUEST: 
        return {loading : true , ...state }
        case PRODUCT_DETAIL_SUCCESS:
        return {loading : false  ,product: action.payload }
        case PRODUCT_DETAIL_FAIL:
          return {loading : false , error: action.payload }        

      default:
        return state;
    }
  };