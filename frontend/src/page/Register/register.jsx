import React, {useState,useEffect} from "react";
import {Link, redirect, useNavigate} from 'react-router-dom'
import {Form , Button,Row,Col,Alert} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import video from "../../components/HeroSection/pottery2.mp4"
import "../../components/HeroSection/HeroSection.css"
import "./register.css"
import Message from "../../components/Message";
import Loader from "../../components/Loader"
import { register } from "../../userredux/useraction";
import ReCAPTCHA from "react-google-recaptcha"
const Register = () => {
  
    const [firstName , setFirstName]=useState('')
    const [lastName , setLastName]=useState('')
    const [cin , setCin]=useState('')
    const [phone , setPhone]=useState('')
    const [dateOfBirth , setDateOfBirth]=useState('')
    const [imageUrl , setImageUrl]=useState('')
    const [email , setEmail]=useState('')
    const [confirmPassword , setConfirmPassword] = useState('')
    const [message , setMessage] = useState(null)
    const [password , setPassword] = useState('')
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const DATE_REGEX =  /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    console.log(userRegister)
    const {loading , error , userInfo} = userRegister
    const navigate= useNavigate()
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
    
      // If the valid status is true, mark the step as finished and valid:
   
    
    


    const handleCaptcha = (value) => {
      if (value) {
        setIsCaptchaVerified(true);
      } else {
        setIsCaptchaVerified(false);
      }
    };
        const submitHandler=(e)=>{
        e.preventDefault()
        const FnameControl = USER_REGEX.test(firstName);
        const LnameControl = USER_REGEX.test(lastName);
        const PwdControl = PWD_REGEX.test(password);
        const AgeControl = DATE_REGEX.test(dateOfBirth)
        if(!PwdControl)
        {
          setMessage("Password needs to contain at least 1 UpperCase , 1 LOWERCASE ,1 number , 1 one character");
          return ;
        }else  if(!FnameControl)
        { 
          setMessage("First name Cannot be empty or contain numbers");
          return ;
        }else  if(!LnameControl)
        {
          setMessage("Last name Cannot be empty or contain numbers");
          return ;
        }else  if(!AgeControl)
        {     const ageInMilliseconds = Date.now() - dateOfBirth.getTime();
          const ageInYears = ageInMilliseconds / 1000 / 60 / 60 / 24 / 365;

          if (ageInYears < 18) {
          setMessage("You need to be at least 18 years old ");
          return ;
        }}
        console.log(lastName,firstName,password);
        if( dispatch(register(firstName,lastName,phone,cin,dateOfBirth,imageUrl,email, password)))
        navigate('/dashboard')
         
        



        //Dispatch LOGIN
       


    }
 
  return (
    <> <div id='alert' align="center">
    {message && <div className="alert">{message}</div>}
      {loading && <Loader />}  </div>
     <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <br />   <br />   <br />   <br />  
        <form id="regForm" className ="register" onSubmit={submitHandler}>
       <div align ="center" className="h11"> <h1>Sign In</h1> </div>
               
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
                           
                <input id="phone" type="phone" 
                placeholder="phone number
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
                <ReCAPTCHA
    sitekey="6Ldzy-UkAAAAAOF98pseL_XgounD7zAY-IT1kms1"
    onChange={handleCaptcha}
  /> 
            <Button type="submit" disabled={!isCaptchaVerified} >Sign In</Button>

            <Row className="py-3">
                <Col>
                        Have an account?{''} <Link to="/login"  >Register</Link>
                </Col> 
            </Row>
        

        </form>  </div> 
           
       
        <div className="div2" >
</div>
    </>
  )
}

export default Register