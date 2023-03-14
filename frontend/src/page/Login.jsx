import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import { login } from "../userredux/useraction";
import video from "../Components/HeroSection/pottery2.mp4"
import "./login.css"
 //import log from '../page/login.css'
 import Message from "../Components/Message";
 import Loader from "../Components/Loader.js";
 import { Alert } from "react-bootstrap";
import FormContainer from "../Components/FormContainer";

const Login = () => {
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
 
  return (
    <>      
        <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        

      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}

        <form className="login" onSubmit={submitHandler}>
        <center>  
          <h1 className="sign">Sign In</h1> </center>

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

            <Row className="py-3">
                <Col>
                        New Customer?{''} <Link to={redirect ? `register?redirect=${redirect}`:'/register'}  >Register</Link>
                </Col>
                <Link to="/forget-password"  >Forget Password</Link>
            </Row>
        </form>
         </div>
    </>
  )
}

export default Login