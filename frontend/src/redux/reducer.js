import { PROJECT_COMMENT_SUCCESS,PROJECT_COMMENT_REQUEST,PROJECT_COMMENT_FAIL, PROJECT_UNCOMMENT_REQUEST, PROJECT_UNCOMMENT_SUCCESS, PROJECT_UNCOMMENT_FAIL
    ,PARTICIPATE_EVENT_SUCCESS,PARTICIPATE_EVENT_REQUEST,PARTICIPATE_EVENT_FAIL,
    UNPARTICIPATE_EVENT_SUCCESS,UNPARTICIPATE_EVENT_REQUEST,UNPARTICIPATE_EVENT_FAIL,
    GET_PARTI_EVENT_FAIL,GET_PARTI_EVENT_REQUEST,GET_PARTI_EVENT_SUCCESS
} from "./constant"

export const commentproject=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case PROJECT_COMMENT_REQUEST : 
            return {loading : true}
        case PROJECT_COMMENT_SUCCESS : 
            return {loading : false , projectcomment : action.payload}
        case PROJECT_COMMENT_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }
export const uncommentproject=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case PROJECT_UNCOMMENT_REQUEST : 
            return {loading : true}
        case PROJECT_UNCOMMENT_SUCCESS : 
            return {loading : false , projectcomment : action.payload}
        case PROJECT_UNCOMMENT_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }

 export const participateevent=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case PARTICIPATE_EVENT_REQUEST : 
            return {loading : true}
        case PARTICIPATE_EVENT_SUCCESS : 
            return {loading : false , part:action.payload,success : true}
        case PARTICIPATE_EVENT_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }

 export const unparticipateevent=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case UNPARTICIPATE_EVENT_REQUEST : 
            return {loading : true}
        case UNPARTICIPATE_EVENT_SUCCESS : 
            return {loading : false , part:action.payload,success : true}
        case UNPARTICIPATE_EVENT_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }

 export const getpart=(state={},action)=>{
    // eslint-disable-next-line default-case
    switch (action.type) {
        case GET_PARTI_EVENT_REQUEST : 
            return {loading : true}
        case GET_PARTI_EVENT_SUCCESS : 
            return {loading : false , part:action.payload,success : true}
        case GET_PARTI_EVENT_FAIL :
            return {loading : false , error: action.payload }        
        default:
            return state    

    }
 }