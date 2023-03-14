/* eslint-disable no-duplicate-case */
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,
     USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, 
     USER_REGISTER_FAIL, GET_USERS_SUCCESS, APPROVE_USER_SUCCESS, 
     FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL, 
     RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL } from "./userconstant";

 export const userLoginReducer=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_LOGIN_REQUEST : 
            return {loading : true}
        case USER_LOGIN_SUCCESS : 
            return {loading : false , userInfo : action.payload}
        case USER_LOGIN_FAIL :
            return {loading : false , error: action.payload }        
        case USER_LOGOUT:
            return {}
        default:
            return state    

    }
 }
 export const userRegisterReducer=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_REGISTER_REQUEST : 
            return {loading : true}
        case USER_REGISTER_SUCCESS : 
            return {loading : false , userInfo : action.payload}
        case USER_REGISTER_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }

 export const userReducers = (state={}, action) => {
    switch (action.type) {
      case GET_USERS_SUCCESS:
        return {  userInfo: action.payload };
      case APPROVE_USER_SUCCESS:
        const updatedUsers = state.userInfo.map((user) =>
          user._id === action.payload.id ? { ...user, role: action.payload.role } : user
        );
        return { userInfo: updatedUsers };
      default:
        return state;
    }
  };

  export const forgetPassword=(state={},action)=>{
    switch (action.type) {
        case FORGET_PASSWORD_REQUEST : 
            return {loading : true}

        case FORGET_PASSWORD_SUCCESS : 
            return {loading : false, success: true }
        case FORGET_PASSWORD_FAIL :
            return {loading : false ,error: action.payload }    
        default:
            return state    

    }
}
export const resetPassword=(state={},action)=>{
    switch (action.type) {
        case RESET_PASSWORD_REQUEST : 
            return {loading : true}
        case RESET_PASSWORD_SUCCESS : 
            return {loading : false }
        case RESET_PASSWORD_FAIL :
            return {loading : false  ,error: action.payload }       
        default:
            return state    

    }
}