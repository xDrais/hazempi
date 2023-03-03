import { createStore, combineReducers , applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';
//el store houwa objet bch ykounou fih des données partagées bin el components lkol

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