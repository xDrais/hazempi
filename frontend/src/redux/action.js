import axios from "axios"
import { PROJECT_COMMENT_FAIL, PROJECT_COMMENT_REQUEST, PROJECT_COMMENT_SUCCESS, PROJECT_UNCOMMENT_FAIL, PROJECT_UNCOMMENT_REQUEST, PROJECT_UNCOMMENT_SUCCESS
,PARTICIPATE_EVENT_SUCCESS,PARTICIPATE_EVENT_REQUEST,PARTICIPATE_EVENT_FAIL,
UNPARTICIPATE_EVENT_SUCCESS,UNPARTICIPATE_EVENT_REQUEST,UNPARTICIPATE_EVENT_FAIL, GET_PARTI_EVENT_REQUEST, GET_PARTI_EVENT_SUCCESS, GET_PARTI_EVENT_FAIL

} from "./constant"

export const projectcomment = ({comment,id}) => async (dispatch)=>{
    try {
        dispatch({
            type:PROJECT_COMMENT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.post(
            `http://localhost:5000/api/project/com/${id}`,
            comment,
            config
        )
  
        dispatch({
            type : PROJECT_COMMENT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: PROJECT_COMMENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }
  
  
export const unprojectcomment = ({comentid,id}) => async (dispatch)=>{
    try {
        dispatch({
            type:PROJECT_UNCOMMENT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.post(
            `http://localhost:5000/api/project/com/${id}`,
            comentid,
            config
        )
  
        dispatch({
            type : PROJECT_UNCOMMENT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: PROJECT_UNCOMMENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }
 
  

  export const participateEvent = (eventId,userId) => async (dispatch)=>{
    try {
        dispatch({
            type:PARTICIPATE_EVENT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.post(
           'http://localhost:5000/api/event/participate',
           eventId,userId,
            config
        )
  
        dispatch({
            type : PARTICIPATE_EVENT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: PARTICIPATE_EVENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }

  
  export const unparticipateEvent = (eventId,userId) => async (dispatch)=>{
    try {
        dispatch({
            type:UNPARTICIPATE_EVENT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.post(
           'http://localhost:5000/api/event/exiteparticipate',
           eventId,userId,
            config
        )
  
        dispatch({
            type : UNPARTICIPATE_EVENT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: UNPARTICIPATE_EVENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }

  export const getPart = () => async (dispatch)=>{
    try {
        dispatch({
            type:GET_PARTI_EVENT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.get(
           'http://localhost:5000/api/event/getparti',
           
            config
        )
  
        dispatch({
            type :GET_PARTI_EVENT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type:GET_PARTI_EVENT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }
  