


import React, { Component , useState,useEffect} from 'react';

import './navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { Navbar} from 'react-bootstrap';
import Example from './sidemenu';
import { Link ,useNavigate } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-bootstrap/NavLink';
import { useDispatch , useSelector } from 'react-redux';
import { Logout } from '../../userredux/useraction';
import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"
import Shepherd from 'shepherd.js';

function Navbarr () {


 
  useEffect(() => {
    const hasCompletedTour = localStorage.getItem('hasCompletedTour');
    if (hasCompletedTour) {
    const tour = new Shepherd.Tour({
      defaultStepOptions: {
        cancelIcon: {
          enabled: true
        },
        classes: 'popup',
        scrollTo: { behavior: 'smooth', block: 'center' },
        modal: true,
        highlightClass: 'shepherd-highlight'
        
      }
    });     
    
    tour.addStep({
      text: `Home sweet home!\
      `,
      attachTo: {
        element: '#home',
        on: 'bottom'
      },
      
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });
    tour.addStep({
      text: 'Shop from our students!.',
      attachTo: {
        element: '#shop',
        on: 'top'
      },
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'another-step'
    });
    tour.addStep({
      text: 'Learn courses on various topics.',
      attachTo: {
        element: '#courses',
        on: 'top'
      },
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'another-step'
    });
    tour.addStep({
      text: `You can make an account with us\
   `,
      attachTo: {
        element: '#register',
        on: 'bottom'
      },
      
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    });
    tour.addStep({
      text: `Navigate through our app using your voice!\
      `,
      attachTo: {
        element: '#ho',
        on: 'bottom'
      },
      
      buttons: [
        {
          action() {
            return this.back();
          },
          classes: 'shepherd-button-secondary',
          text: 'Back'
        },
        {
          action() {
            return this.next();
          },
          text: 'Next'
        }
      ],
      id: 'creating'
    })
    tour.start();
     localStorage.setItem('hasCompletedTour', true);
  }
  }, []);
  
  // rest of the code...

  
  const dispatch = useDispatch()
  const userLogin =useSelector(state =>state.userLogin)
  const {userInfo} =userLogin
  const navigate = useNavigate();
  const [redirectUrl, setRedirectUrl] = useState("")
  const logoutHandler = () => {
      dispatch(Logout())
      navigate("/");
  }
  const commands = [
    {
      commands: ["Go to *", "Open *"],
      callback: (redirectPage) => setRedirectUrl(redirectPage),
    },
  ]
  const { transcript } = useSpeechRecognition({ commands });
  const pages = ["home", "shop", "courses", "aboutus", "register"]
  const urls = {
    home: "/",
    shop: "/shop",
    courses: "/courses",
    aboutus: "/aboutus",
    register: "/register"
  };
  
 
  
  useEffect(() => {
    if (transcript) {
      for (let i = 0; i < pages.length; i++) {
        if (transcript.toLowerCase().includes(pages[i])) {
          setRedirectUrl(pages[i]);
          break;
        }
      }
    }
  }, [transcript, pages]);
  
  useEffect(() => {
    if (redirectUrl && pages.includes(redirectUrl)) {
      navigate(urls[redirectUrl], { replace: true });
    }
  }, [redirectUrl, navigate, pages, urls]);
  
        return( <>

        <Navbar id="me" className={"fixed-top" } expand="lg" background-color="transparent"><nav className="NavbarItems">
            
            <ul>
           
            
                        <li > <Link id="home" className="nav_links"  to="/">
                            
                            HOME
                          

                             </Link>
                            <Link  id="shop" className="nav_links" to="/shop">
                           
                            SHOP
                            
                             </Link>
                            <Link id="courses" to="/courses" className="nav_links">

                            COURSES
                            
                             </Link>
                            <Link id="about us" to="/aboutus" className="nav_links">

                            ABOUT US                            
                             </Link>
                           
                               <Link id="register"to="/register" style={{marginLeft: '600px'}} className="nav_links">

REGISTER                         </Link>

           
       {userInfo?(
           <div style={{marginLeft: '1120px',marginTop: '-27.8px'}} > 
                    <NavDropdown   title={userInfo.lastName + " " + userInfo.firstName } id="username">
                      
                        <LinkContainer  to='/profile'>
                            <NavDropdown.Item > <Link to="/profile" >PROFILE</Link> </NavDropdown.Item>
                        </LinkContainer>
                        <LinkContainer  to='/userupdate'>
                            <NavDropdown.Item > <Link to="/userupdate" >UPDATE PROFILE</Link> </NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} >LOGOUT</NavDropdown.Item>
                    </NavDropdown>  </div>
            
            )  : 
            <Link className="nav_links" to={"/login"}>
                SIGNIN
                </Link>         
            }  

                          

                            
                              <a className="nav_links">    
                              <FontAwesomeIcon id="ho"icon={faMicrophone}  onClick={SpeechRecognition.startListening} size="lg" />
                              <a className="nav_links smalltext" id="transcript"> {transcript}</a>
</a>
                            </li>
            </ul>
           <div>
           
 </div> 
            </nav> 
            <Example className="disablede"/>
              </Navbar></>
        )

    }

export default Navbarr;