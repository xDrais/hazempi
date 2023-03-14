import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import { login } from "../userredux/useraction";
import video from "../Components/HeroSection/pottery2.mp4"
import Google from "../Components/login/google.png"
import { GoogleLogin } from 'react-google-login';

import axios from "axios";
import "./login.css"
 //import log from '../page/login.css'
 import Message from "../Components/Message";
 import Loader from "../Components/Loader.js";
 import { Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";

const Login = () => {
 

 const googleAuth = ()=>{
  window.open(
    'http://localhost:5000/auth/google/callback',
    "_self"
  )
 }



 //fb 
 // Login
const handleLogin = () => {
  window.location.href = 'http://localhost:3000/auth/facebook';
}

// Logout
const handleLogout = () => {
  fetch('/logout', { method: 'POST' })
      .then(() => {
          window.location.href = '/login';
      });
}


 //end fb
  
  const handleGoogleSignIn = () => {
    window.gapi.auth2.getAuthInstance().signIn().then((googleUser) => {
      const id_token = googleUser.getAuthResponse().id_token;

      axios.post('http://localhost:5000/auth/google/callback', {
        id_token: id_token
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    });
  };
    

    

        

    const [email , setEmail]=useState('')
    const [password , setPassword] = useState('')
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {loading , error } = userLogin

    const submitHandler=(e)=>{
        e.preventDefault()
        //Dispatch LOGIN
        dispatch(login(email, password))

    }
    function onSignIn(googleUser) {
      const idToken = googleUser.getAuthResponse().id_token;
      fetch('/login',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
        })
        .then((response) => response.json())
        .then((data) => {
        // Update the UI with the logged in user's information
        });
        }
      // Send the idToken to your MERN application's login endpoint
    
    
    
    
 
  return (
    <>      
        <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <br />   <br />   <br />   <br />  
        <br />   <br />   <br />   <br />  

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

        <form className="login" onSubmit={submitHandler}>
        <center>  <h1 className="sign">Sign In</h1> </center>

                <label htmlFor="email">
                    Email Address
                </label>
                <input id="email" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}>
                </input>
           

            
                <label htmlFor="password">
                    Password
                </label>               
                <input id="password" type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}>
                </input>
            <Button type="submit" variant="primary" >Sign In</Button>
           

            <button onClick={googleAuth}>Sign In with Google</button>
            <button onClick={handleLogin}>Sign In with Facebook</button>

            <Row className="py-3">
                <Col>
                        New Customer?{''} <Link to={redirect ? `register?redirect=${redirect}`:'/register'}  >Register</Link>
                </Col>
            </Row>
        </form>
         </div>
    </>
  )
}

export default Login