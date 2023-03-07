
import "../HeroSection/HeroSection.css"
import "./login.css"
import video from "../HeroSection/pottery2.mp4"
import Button from "../Button/button"
function Login(){



    return(
        <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <form >
  <h3 align="center">Login </h3>

  <label htmlFor="username">Username</label>
  <input type="text" placeholder="Email or Phone" id="username" />

  <label htmlFor="password">Password</label>
  <input type="password" placeholder="Password" id="password" />

  <Button name="Log In"></Button>
  <div className="social">
    <div className="go"><i className="fab fa-google"></i> Google</div>
    <div className="fb"><i className="fab fa-facebook"></i> Facebook</div>
  </div>
</form>


        </div>    )
}
export default Login