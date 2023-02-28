import {createStore , combineReducers , } from 'redux'
import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';


const reducer = combineReducers({
    //reducers
})

const initialState ={
        //localstorage
  }
  const middleware = [thunk]
  
  const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)));
  
  export default store