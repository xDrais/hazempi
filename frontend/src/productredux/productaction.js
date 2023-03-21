import axios from "axios";
import { GET_PRODUCT_SUCCESS, USER_PRODUCTADD_FAIL, USER_PRODUCTADD_REQUEST, USER_PRODUCTADD_SUCCESS } from "./productconstant";

export const productadd = ({ name ,
    price , 
    user,
    category , 
    countInStock ,
    description}) => async (dispatch)=>{
    try {
          dispatch({
              type:USER_PRODUCTADD_REQUEST
          })
          const config = {
              headers:{
                  'Content-Type' : 'multipart/form-data'
              }
          }
  
          const { data } = await axios.post(
              'http://localhost:5000/product/createProduct',
{name ,
    price , 
    user,
    category , 
    countInStock ,
    description}           ,   config
            );
  
          dispatch({
              type : USER_PRODUCTADD_SUCCESS,
              payload : data
          })
       
         // localStorage.setItem('userInfo', JSON.stringify(data))
  
         } catch(error){
        if (error.response && error.response.data.message === 'Product with this name already exists') {
            dispatch({
                type: USER_PRODUCTADD_FAIL,
                payload: error.response.data.message
            });
        } else {
            dispatch({
                type: USER_PRODUCTADD_FAIL,
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