import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col,Message} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import video from "../../components/HeroSection/pottery2.mp4"
import "../../components/HeroSection/HeroSection.css"
import "./register.css"

import { register } from "../../userredux/useraction";
const Register = () => {
   
    const [firstName , setFirstName]=useState('')
    const [lastName , setLastName]=useState('')
    const [cin , setCin]=useState('')
    const [phone , setPhone]=useState('')
    const [dateOfBirth , setDateOfBirth]=useState('')
    const [imageUrl , setImageUrl]=useState('')
    const [email , setEmail]=useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message , setMessage] = useState('')
    const [password , setPassword] = useState('')
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading , error , userInfo} = userRegister
    const navigate= useNavigate()
        const submitHandler=(e)=>{
        e.preventDefault()
        const v1 = USER_REGEX.test(firstName);
        const v2 = USER_REGEX.test(lastName);
        const v3 = USER_REGEX.test(password);
        if(!v1 || !v2 || !v3)
        {
          setMessage("Invalid Entry");
          return ;
        }
        console.log(lastName,firstName,password);
        if( dispatch(register(firstName,lastName,phone,cin,dateOfBirth,imageUrl,email, password)))
        navigate('/dashboard')



        //Dispatch LOGIN
       


    }
 
  return (
    <>
    <div>
      {Message}
    </div>
     <div className='hero-container'>
        <video src={video} autoPlay loop muted />

        {error && <div variant="danger">{error}</div>}
        
        <form className ="register" onSubmit={submitHandler}>
        <h1>Sign In</h1>

               
                <input id="firstName" type="text" placeholder="First Name" value={firstName} onChange={(e)=> setFirstName(e.target.value)}>
                </input>
               
                <input id="lastName" type="text" placeholder="Last Name" value={lastName} onChange={(e)=> setLastName(e.target.value)}>
                </input>
           
              
                <input id="email" type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}>
                </input>

                          
                <input id="password" type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e)=> setPassword(e.target.value)}>
                </input>

                        
                <input id="cin" type="text" 
                placeholder="Cin" 
                value={cin} 
                onChange={(e)=> setCin(e.target.value)}>
                </input>
                           
                <input id="phone" type="text" 
                placeholder="                dateOfBirth
                " 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)}>
                </input>
                             
                <input id="dateOfBirth" type="date" 
                placeholder="                dateOfBirth
                " 
                value={dateOfBirth} 
                onChange={(e)=> setDateOfBirth(e.target.value)}>
                </input>
                            
                <input id="imageUrl" type="file" 
                placeholder="imageUrl" 
                value={imageUrl} 
                onChange={(e)=> setImageUrl(e.target.value)}>
                </input> 
            <Button type="submit" >Sign In</Button>

            <Row className="py-3">
                <Col>
                        New Customer?{''} <Link to={redirect ? `register?redirect=${redirect}`:'/register'}  >Register</Link>
                </Col> 
            </Row>
           


        </form>  </div>
    </>
  )
}

export default Register