import axios from 'axios'
import { PRODUCT_ADD_FAIL, PRODUCT_ADD_REQUEST, PRODUCT_ADD_SUCCESS,GET_PRODUCT_SUCCESS, PRODUCT_DETAIL_REQUEST, 
  PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL, DELETE_PRODUCT_FAIL, 
  DELETE_PRODUCT_REQUEST , DELETE_PRODUCT_SUCCESS } from './productconstant';

export const productadd = ({ 
    productName ,
    imageProduct,
    price , 
    user,
    category , 
    countInStock ,
    description}) => async (dispatch)=>{
    try {
          dispatch({
              type:PRODUCT_ADD_REQUEST
          })
          const config = {
              headers:{
                  'Content-Type' : 'multipart/form-data'
              }
          }
  
          const { data } = await axios.post(
              'http://localhost:5000/product/createProduct',
{productName ,
    price , 
    imageProduct,
    user,
    category , 
    countInStock ,
    description}           ,   config
            );
  
          dispatch({
              type : PRODUCT_ADD_SUCCESS,
              payload : data
          })
       
         // localStorage.setItem('userInfo', JSON.stringify(data))
  
         } catch(error){
        if (error.response && error.response.data.message === 'Product with this name already exists') {
            dispatch({
                type: PRODUCT_ADD_FAIL,
                payload: error.response.data.message
            });
        }
          
        else {
            dispatch({
                type: PRODUCT_ADD_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.data.message
                    : error.message
            });
        }
        console.log(error.response.data.message);
    }
  }
  export const getProducts = () => async (dispatch) => {
    try {
      const response = await fetch('http://localhost:5000/product/getAll', {
        method: 'GET',
        headers: {
          accept: 'multipart/form-data',
        },
      });
  
      const data = await response.json();
  
      dispatch({ type: GET_PRODUCT_SUCCESS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };


  export const productDetails = (id) => async (dispatch)=>{
    try {
          dispatch({
              type:PRODUCT_DETAIL_REQUEST
          })
  
          const { data } = await axios.get(
            `http://localhost:5000/product/${id}`,
{}          
            );
  
          dispatch({
              type : PRODUCT_DETAIL_SUCCESS,
              payload : data
          })
       
         // localStorage.setItem('userInfo', JSON.stringify(data))
  
         } catch(error){
        
            dispatch({
                type: PRODUCT_DETAIL_FAIL,
                payload: error.response && error.response.data.message
                    ? error.response.data.data.message
                    : error.message
            });
        
        console.log(error.response.data.message);
    }
  }

  
  export const deleteProduct = (id) => async (dispatch)=>{
    try {
        dispatch({
            type:DELETE_PRODUCT_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }
  
        const {data } =await axios.delete(
            `http://localhost:5000/product/delete/${id}`,
            config
        )
  
        dispatch({
            type : DELETE_PRODUCT_SUCCESS,
            payload : data
            
        })
    } catch(error){
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })
  
    }
  }