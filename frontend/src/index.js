import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import store from './App/store';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router,Route,Routes,Navigate} from 'react-router-dom';
import Crowdfundingpage from './pages/productdetail';
import CoursesPage from './pages/CoursesPage';
import Loginpage from './pages/Login';
import PreSignUpPage from './pages/PreSignUpPage';
import SignupPage from './pages/Signup';
import SignUpPartner from './Components/signup/signupPartner';
import LoginScreen from './screens/LoginScreen.js';
import Login from './Components/login/login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
        <Router>

<Routes>

<Route path="/" element={<App/>} />
<Route path="/home" exact element={<App/>} />
<Route path="/crowdfunding" element={<Crowdfundingpage/>} />
<Route path="/courses" element={<CoursesPage/>} />
<Route path="/login" element={<Loginpage/>} />
<Route path="/presignup" element={<PreSignUpPage/>} />
<Route path="/signup" element={<SignupPage/>} />
<Route path="/signuppartner" element={<SignUpPartner/>} />
</Routes>
</Router>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
