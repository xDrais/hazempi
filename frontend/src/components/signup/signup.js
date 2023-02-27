import "../login/login.css"
import video from "../HeroSection/pottery2.mp4"
import Button from "../Button/button"
function Signup() {
  
    return(
        <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <form >

  <input type="text" placeholder="First Name" id="FName" />

  <input type="password" placeholder="Last Name" id="LName" />
  <input type="text" placeholder="Email or Phone" id="username" />

  <input type="password" placeholder="Password" id="password" />
  <input type="password" placeholder="confirm Password" id="Retype_password" />

  <input type="date" placeholder="Email or Phone" id="username" />


 <Button name="Sign Up "></Button>
</form>


        </div>    )
}
export default Signup