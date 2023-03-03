import "../HeroSection/HeroSection.css"
import "./login.css"
import video from "../HeroSection/pottery2.mp4"
import Button from "../Button/button"
import {useRef, useState,useEffect} from 'react';
function Login(){
 
  const [ email,setEmail] = useState('');
  const [password,setPassword] = useState('');


    return(
        <div className='hero-container'>
        <video src={video} autoPlay loop muted />
        <form onSubmit={submitHandler}>
          
  <h3 align="center">Login </h3>

  <label for="email">Username</label>
  <input 
  
  type="email" 
  placeholder="Enter email"
   id="email"
   value={email}
   onChange={(e)=>setEmail(e.target.value)} />

  <label for="password">Password</label>
  <input type="password"
   placeholder="Password"
    id="password" 
    value={password}
    onChange={(e)=>setPassword(e.target.value)} 
    />

  <Button type="submit" name="Log In"></Button>
  <div class="social">
    <div class="go"><i class="fab fa-google"></i> Google</div>
    <div class="fb"><i class="fab fa-facebook"></i> Facebook</div>
  </div>
</form>


        </div>    )
}
export default Login