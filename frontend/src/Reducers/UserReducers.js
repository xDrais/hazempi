/* eslint-disable no-duplicate-case */
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT } from "../Constants/UserConstant";

 export const userLoginReducer=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case USER_LOGIN_REQUEST : 
            return {loading : true}

        case USER_LOGIN_SUCCESS : 
            return {loading : false , userInfo : action.paylaod}
        case USER_LOGIN_FAIL :
            return {loading : false , error: action.paylaod }        
        case USER_LOGOUT:
            return {}
        default:
            return state    

    }
 }