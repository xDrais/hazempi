import React, {useState} from "react";
import {Link, useNavigate} from 'react-router-dom'
import { Button,Row,Col} from 'react-bootstrap'
import { useDispatch , useSelector } from "react-redux";
import video from "../../components/HeroSection/pottery2.mp4"
import "../../components/HeroSection/HeroSection.css"
import "./register.css"
import "./arrows.css"

import SpecialButton from "../../components/Button/button";
import Loader from "../../components/Loader"
import { register } from "../../userredux/useraction";
import ReCAPTCHA from "react-google-recaptcha"







function ArrowWrapperLeft({ disabled, onClick,visibility }) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "400",
        marginTop: "50%",
        marginLeft: "-120px",
        pointerEvents: disabled ? "none" : "auto", // disable pointer events if disabled is true
        opacity: disabled ? 0.5 : 1, // reduce opacity if disabled is true
        visibility: visibility,

      }}
      id="arrow_2"
      className="arrow-wrapper"
      onClick={onClick}

    >
      <div className="arrow arrow--left">
        <span>Prev</span>
      </div>
    </div>
  );
}

export {ArrowWrapperLeft};

function ArrowWrapperRight({ disabled, onClick,visibility }) {
  return (
    <div
      style={{
        position: "absolute",
        zIndex: "400",
        marginTop: "195px",
        marginLeft: "400px",
        pointerEvents: disabled ? "none" : "auto", // disable pointer events if disabled is true
        opacity: disabled ? 0.5 : 1, // reduce opacity if disabled is true
        visibility: visibility,


      }}
      id="arrow_2"
      className="arrow-wrapper"
      onClick={onClick}
      
      
     


    >
      <div className="arrow arrow--right">
        <span>Next</span>
      </div>
    </div>
  );
}

export {ArrowWrapperRight};









const Register = () => {
    //State taa el captcha keni verified wala le 
    const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);

    //steps taa el form 
    const [step, setStep] = useState(1);
    // states taa simple user 
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
    //states taa Coach 
    const [speciality , setSpeciality]=useState('')
    const [descriptionCoach , setDescriptionCoach]=useState('')
    const [dateDebutExperience , setDateDebutExperience]=useState('')
    const [dateFinExperience , setDateFinExperience]=useState('')
    const [titrePoste , setTitrePoste]=useState('')
    const [certification , setCertification]=useState('')

      // Clear the input field when the user interacts with it

    function handleInputFocus(e) {
      e.target.value = '';
    }



    //Controle de saisie taa el user 
    const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const DATE_REGEX =  /^(?:19|20)\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

    const dispatch = useDispatch()
    const userRegister = useSelector(state => state.userRegister)
    const {loading , error , userInfo} = userRegister
    
    //hedhi bch taamelek el redirection 
    const navigate= useNavigate()   
    
    

    //Fonction etat el captcha
    const handleCaptcha = (value) => {
      if (value) {
        setIsCaptchaVerified(true);
      } else {
        setIsCaptchaVerified(false);
      }
    };
    //Controle de saisie + Simple user 
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
        } if(AgeControl && LnameControl && FnameControl && PwdControl)
        return true ; 
        else return false 
      
      }
        dispatch(register(firstName,lastName,phone,cin,dateOfBirth,imageUrl,email, password, speciality,descriptionCoach,dateDebutExperience,dateFinExperience,titrePoste,certification))
    }

    //Fonction Onclick taa el previous step 
    const handlePrevStep = () => {
      if (step === 4) {
        setStep(1);
      } else 
      if (step === 3) {
        setStep(1);
      } else 
      setStep((prevStep) => prevStep - 1);
    
    };
      //Fonction Onclick taa el next step 

    const handleNextStep = () => {
      if (step === 4) {
        setStep(5);
      } else 
      if (step === 3) {
        setStep(5);
      } else 
      setStep((prevStep) => prevStep + 1);
    };    



  return (
    <> 
    {/* el video taa el background */}
     <div className='hero-container'>
        <video src={video} autoPlay loop muted />  
         {/* el message taa el controle de saisie w el loader   */}
        {message && <div className="alert">{message}</div>}
      {loading && <Loader />} 


      




       {/* form start    */}
        <form  className ="register" onSubmit={submitHandler}>
       <div align ="center" style={{ marginBottom: "20px",marginTop: "-20px"}}> <h1>Sign In</h1> </div>
      {/* les boutons mtaa previous w next */}

       <ArrowWrapperLeft onClick={handlePrevStep} disabled={step === 1} visibility ={step===2 ? "hidden" : "visible"}/>
       <ArrowWrapperRight onClick={handleNextStep}  disabled={step === 2 || ( !isCaptchaVerified) } visibility ={step===2 ? "hidden" : "visible"}/>



       
 {/* step lowla mtaa el form eli fiha el info taa simple user */}
       {step === 1 && (

<>              <input id="firstName" 
                  type="text" 
                  placeholder="First Name"
                  value={firstName}
                   onChange={(e)=> setFirstName(e.target.value)}>
                </input>
               
                <input id="lastName"
                 type="text"
                  placeholder="Last Name" 
                  value={lastName} 
                  onChange={(e)=> setLastName(e.target.value)}>
                </input>
           
              
                <input id="email"
                 type="email" 
                 placeholder="Email"
                  value={email} 
                  onChange={(e)=> setEmail(e.target.value)}>
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
                placeholder="phone number" 
                value={phone} 
                onChange={(e)=> setPhone(e.target.value)}>
                </input>
                             
                {dateOfBirth ? (
        <input
          id="dateOfBirth"
          type="date"
          value={dateOfBirth}
          onFocus={handleInputFocus}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />
      ) : (
        <input
          id="dateOfBirth"
          type="text"
          value=""
          placeholder="Date of Birth"
          onFocus={handleInputFocus}
          onChange={(event) => setDateOfBirth(event.target.value)}
        />
      )}
                            
                <input id="imageUrl" type="file" 
                placeholder="imageUrl" 
                value={imageUrl} 
                onChange={(e)=> setImageUrl(e.target.value)}>
                </input> 
                <ReCAPTCHA
                sitekey="6Ldzy-UkAAAAAOF98pseL_XgounD7zAY-IT1kms1"
                onChange={handleCaptcha}
                                              />  </>  )}

 {/* step 2 fin tekhtar ken theb tkoun coach wala sponsor */}

{step === 2 && (  <> <SpecialButton  name="Become a Coach" onClick={() => setStep(4)} /> 
<SpecialButton onClick={() => setStep(3)} name="Become a Sponsor" />
<SpecialButton name="Continue as a Student"  onClick={() => setStep(5)}/></>)}


 {/* step 3 mtaa be9i el form for sponsor */}

              {step === 3 && (  <> Sponsor</>)}
 {/* step 4 mtaa be9i el form for Coach */}

              {step === 4 && (  <>
                <input id="speciality" 
                  type="text" 
                  placeholder="Speciality"
                  value={speciality}
                   onChange={(e)=> setSpeciality(e.target.value)}>
                </input>
               
                <input id="descriptionCoach"
                 type="text"
                  placeholder="Description Coach" 
                  value={descriptionCoach} 
                  onChange={(e)=> setDescriptionCoach(e.target.value)}>
                </input>
           
              
                <input id="titrePoste"
                 type="text" 
                 placeholder="Titre Poste"
                  value={titrePoste} 
                  onChange={(e)=> setTitrePoste(e.target.value)}>
                </input>

                <input id="certification"
                 type="file" 
                 placeholder="Certification"
                  value={certification} 
                  onChange={(e)=> setCertification(e.target.value)}>
                </input>

                <input id="dateDebutExperience"
                 type="date" 
                 placeholder="Date Debut Ex"
                  value={dateDebutExperience} 
                  onChange={(e)=> setDateDebutExperience(e.target.value)}>
                </input>
                <input id="dateFinExperience"
                 type="date" 
                 placeholder="Date Fin Ex"
                  value={dateFinExperience} 
                  onChange={(e)=> setDateFinExperience(e.target.value)}>
                </input>


                </>)}

 {/* step 5 mtaa terms of use w submit simple user */}


                {step === 5 && (  <> 
                <Button style={{ marginTop: "5px"}}type="submit">Sign In</Button>
          
                 <Row className="py-3">
                     <Col>
                      Have an account?{''} <Link to="/login"  >Register</Link>
                    </Col> 
                 </Row>
                  Terms and Services</>
                  )}




      

        </form> 
         {/* fin form */}

       </div>  {/* fin video background */}

           
       
       
    </>
  )
}

export default Register