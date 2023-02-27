import "../HeroSection/HeroSection.css"
import "./PreSignUp.css"
import video from "../HeroSection/pottery2.mp4"
import Button from "../Button/button"
import Student from "./Student.png"
import Partner from "./Partner.png"
import Coach from "./Coach.png"
import { Router, Routes,Route } from "react-router-dom"
import Login from "../login/login"
import { Link } from "react-router-dom";

function PreSignUp() {
 return(
 <>
  <div className='hero-container'>
        <video src={video} autoPlay loop muted />
       <div className="sign-up-group" style={{display:"flex"}}>
<div className="sign-up-as ">
    <h3>Sign up as a Coach</h3>
    <img  src={Coach} alt="Coach " />
    

    <h4>Coach</h4>

</div>
<div id="Student"className="sign-up-as">
<h3>Sign up as an Student</h3>

<img src={Student} alt="student " />
<h4>Student</h4>


</div>
<div className="sign-up-as">
<h3>Sign up as a Partner</h3>
<img  src={Partner} alt="Partner " />
<h4>Partner</h4>

</div>
</div>

        </div> 
 </>)   
}
export default PreSignUp;