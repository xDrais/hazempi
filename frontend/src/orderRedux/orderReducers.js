import {
  ORDER_CREATE_REQUEST, 
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,ORDER_PAY_SUCCESS,ORDER_PAY_RESET,
   GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAIL,ORDER_DELIVER_REQUEST, 
   ORDER_DELIVER_SUCCESS,ORDER_DELIVER_FAIL,ORDER_DELIVER_RESET, GET_ORDER_DASHBOARD_REQUEST,
    GET_ORDER_DASHBOARD_SUCCESS, GET_ORDER_DASHBOARD_FAIL,
   ORDER_APPROVE_REQUEST, 
   ORDER_APPROVE_SUCCESS, 
   ORDER_APPROVE_FAIL,
     PRODUCTS_ORDER_REQUEST,PRODUCTS_ORDER_SUCCESS,PRODUCTS_ORDER_FAIL, 
     DASHBOARD_PRODUCTS_ORDER_REQUEST, DASHBOARD_PRODUCTS_ORDER_SUCCESS,
      DASHBOARD_PRODUCTS_ORDER_FAIL, REMOVE_PRODUCT_FROM_ORDER_REQUEST,
       REMOVE_PRODUCT_FROM_ORDER_SUCCESS, REMOVE_PRODUCT_FROM_ORDER_FAILURE
  } from './orderConstants.js'

export const orderCreateReducer = (state= {}, action)=>{
  switch(action.type){
      case ORDER_CREATE_REQUEST:
          return {
              loading : true
          }
      case ORDER_CREATE_SUCCESS:
          return{
              loading:false,
              success : true,
              order: action.payload
          }    
      case ORDER_CREATE_FAIL:
          return{
              loading:false,
              error: action.payload,
          }    
      default :        
          return state
  }
}




export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      }
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      }
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      
    default:
      return state
  }
}



export const orderPayReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        
        loading: true,
      }
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
      case ORDER_PAY_RESET:
        return {}  
    default:
      return state
  }
}

export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case GET_ORDER_REQUEST:
      return { loading: true, orders: [] }
    case GET_ORDER_SUCCESS:
      return { loading: false, orders: action.payload }
    case GET_ORDER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}


export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DELIVER_REQUEST:
      return {
        loading: true,
      }
    case ORDER_DELIVER_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case ORDER_DELIVER_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_DELIVER_RESET:
      return {}
    default:
      return state
  }
}


export const orderDashboardReducer  = (state = { orders: [] }, action) => {
switch (action.type) {
  case GET_ORDER_DASHBOARD_REQUEST:
    return { loading: true, orders: [] }
  case GET_ORDER_DASHBOARD_SUCCESS:
    return { loading: false, orders: action.payload }
  case GET_ORDER_DASHBOARD_FAIL:
    return { loading: false, error: action.payload }
  default:
    return state
}
}



export const orderApproveReducer  = (state = { orders: [] }, action) => {
switch (action.type) {
  case ORDER_APPROVE_REQUEST:
    return { loading: true, orders: [] }
  case ORDER_APPROVE_SUCCESS:
    return { loading: false, orders: action.payload }
  case ORDER_APPROVE_FAIL:
    return { loading: false, error: action.payload }
  default:
    return state
}
}
export const getProductsOrderItemsByIdReducer = (state = { loading: true }, action) => {
switch (action.type) {
  case PRODUCTS_ORDER_REQUEST:
    return { loading: true };
  case PRODUCTS_ORDER_SUCCESS:
    return { loading: false, productDetails: action.payload };
  case PRODUCTS_ORDER_FAIL:
    return { loading: false, error: action.payload };
  default:
    return state;
}
};


export const getDashboardProductsReducer = (state = { loading: true, products: [] }, action) => {
switch (action.type) {
  case DASHBOARD_PRODUCTS_ORDER_REQUEST:
    return { loading: true, products: [] };
  case DASHBOARD_PRODUCTS_ORDER_SUCCESS:

    return { loading: false, products: action.payload };
  case DASHBOARD_PRODUCTS_ORDER_FAIL:
    return { loading: false, error: action.payload, products: [] };
  default:
    return state;
}
};


export const removeProductFromOrderReducer = (state = {}, action) => {
switch (action.type) {
  case REMOVE_PRODUCT_FROM_ORDER_REQUEST:
    return { loading: true };
  case REMOVE_PRODUCT_FROM_ORDER_SUCCESS:
    return { loading: false, success: true };
  case REMOVE_PRODUCT_FROM_ORDER_FAILURE:
    return { loading: false, error: action.payload };
  default:
    return state;
}
};
