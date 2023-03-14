import axios from 'axios'
import { USER_LOGIN_FAIL, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS,USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS ,USER_REGISTER_FAIL, APPROVE_USER_SUCCESS, GET_USERS_SUCCESS, FORGET_PASSWORD_REQUEST, FORGET_PASSWORD_SUCCESS, FORGET_PASSWORD_FAIL, RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAIL, BLOCK_USER, UNBLOCK_USER} from "./userconstant"
import { useNavigate } from 'react-router-dom'

export const login = (email,password) => async (dispatch)=>{
    try {
        dispatch({
            type:USER_LOGIN_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'application/json'
            }
        }

        const { data } = await axios.post(
            'http://localhost:5000/api/user/login',
            { email, password },
       
            config
          );

        dispatch({
            type : USER_LOGIN_SUCCESS,
            payload : data
        }) 
        localStorage.setItem('userInfo', JSON.stringify(data))
   
    


    } catch(error){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          })

    }
}
export const register = (firstName,lastName,cin,phone,dateOfBirth,imageUrl,email,password,speciality,descriptionCoach,dateDebutExperience,dateFinExperience,titrePoste,certification,entrepriseName,sector,descriptionSponsor,file,fil) => async (dispatch)=>{
  try {
        dispatch({
            type:USER_REGISTER_REQUEST
        })
        const config = {
            headers:{
                'Content-Type' : 'multipart/form-data'
            }
        }

        const { data } = await axios.post(
            'http://localhost:5000/api/user/register',
            {firstName,lastName,cin,phone,dateOfBirth,imageUrl, email, password,speciality,descriptionCoach,dateDebutExperience,dateFinExperience,titrePoste,certification,entrepriseName,sector,descriptionSponsor,file,fil },
            config
          );

       if( dispatch({
            type : USER_REGISTER_SUCCESS,
            payload : data
        })) 
        dispatch ({
            type : USER_LOGIN_SUCCESS,
            payload : data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch(error){
      if (error.response && error.response.data.message === 'User with this E-mail adress already exists') {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response.data.message
          });
      } else {
          dispatch({
              type: USER_REGISTER_FAIL,
              payload: error.response && error.response.data.message
                  ? error.response.data.data.message
                  : error.message
          });
      }
      console.log(error.response.data.message);
  }
}

export const Logout = ()=>(dispatch) =>{
    localStorage.removeItem('userInfo')
    dispatch({
        type:USER_LOGOUT
    })}

export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url, body) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });

  const data = await response.json();

  if (!response.ok) {
    let message;

    if (data?.message) {
      message = data.message;
    } else {
      message = data;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!response.ok) {
    let message = "An error occured...";

    if (data?.message) {
      message = data.message;
    }

    return { error: true, status: response.status, message };
  }

  return data;
};

export const getUsers = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/getalluser', {
      method: 'GET',
      headers: {
        accept: 'multipart/form-data',
      },
    });

    const data = await response.json();

    dispatch({ type: GET_USERS_SUCCESS, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const approveUser = (id, role) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:5000/api/user/approve/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ role }),
    });

    if (response.ok) {
      console.log(`User ${id} approved with role ${role}`);
      dispatch({ type: APPROVE_USER_SUCCESS, payload: { id, role } });
    } else {
      console.log(`Failed to approve user ${id}`);
    }
  } catch (error) {
    console.log(error);
  }
};


export const Forget_Password = (email) => async (dispatch)=>{
  try {
      dispatch({
          type:FORGET_PASSWORD_REQUEST
      })
      const config = {
          headers:{
              'Content-Type' : 'application/json'
          }
      }

      const {data } =await axios.post(
          'http://localhost:5000/api/user/forget-password',
          {email},
          config
      )
              
      dispatch({
          type : FORGET_PASSWORD_SUCCESS,
          payload : data
      })

  } catch(error){
      dispatch({
          type: FORGET_PASSWORD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })
        
        
        
        
  }
}


export const resetPassword = (password,id,token) => async (dispatch)=>{
  try {
      dispatch({
          type:RESET_PASSWORD_REQUEST
      })
      const config = {
          headers:{
              'Content-Type' : 'application/json'
          }
      }

      const {data } =await axios.post(
          `http://localhost:5000/api/user/reset-password?id=${id}&token=${token}`,
          {password},
          config
      )

      dispatch({
          type : RESET_PASSWORD_SUCCESS,
          payload : data
          
      })
  } catch(error){
      dispatch({
          type: RESET_PASSWORD_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        })

  }
}

export const blockUser = (id) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/block', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    dispatch({ type: UNBLOCK_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const unblockUser = (id) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:5000/api/user/unblock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });
    const data = await response.json();
    dispatch({ type: BLOCK_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};