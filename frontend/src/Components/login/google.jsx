import React from "react";
import { GoogleLogin } from 'react-google-login';
import axios from "axios";

const Google=()=>{
   
    const GOOGLE_CLIENT_ID = process.env.REACT_APP_FACEBOOK_CLIENT_ID

    const sendAccessTokenToServer = async (accessToken) => {
        try {
          const response = await axios.post('/api/auth/google', { access_token: accessToken });
          console.log(response.data);
          // Handle the response from the server
        } catch (error) {
          console.error(error);
          // Handle the error
        }
      };


      
        const responseGoogle = (response) => {
            const { accessToken } = response;
            // Send the access token to your server to authenticate the user
            sendAccessTokenToServer(accessToken);
          }
          
 

    return(
        <GoogleLogin
  clientId={GOOGLE_CLIENT_ID}
  buttonText="Login with Google"
  onSuccess={responseGoogle}
  onFailure={responseGoogle}
  cookiePolicy={'single_host_origin'}
/>

    )
}

export default Google