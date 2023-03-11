import React, { Component } from 'react';

import './navbar.css'
import Nav from 'react-bootstrap/Nav';
import { Navbar} from 'react-bootstrap';
import Example from './sidemenu';
import { Link } from "react-router-dom";
import NavDropdown from 'react-bootstrap/NavDropdown';
import LinkContainer from 'react-bootstrap/NavLink';
import { useDispatch , useSelector } from 'react-redux';
import { Logout } from '../../userredux/useraction';


function Navbarr () {
  const dispatch = useDispatch()
  const userLogin =useSelector(state =>state.userLogin)
  const {userInfo} =userLogin
  const logoutHandler = () => {
      dispatch(Logout())
  }
  
        return( <>

        <Navbar id='mynav' className={"fixed-top" } expand="lg" background-color="transparent"><nav className="NavbarItems">
            
            <ul>
           
            
                        <li > <Link className="nav_links"  to="/">
                            
                            HOME
                          

                             </Link>
                            <Link  className="nav_links" to="/shop">
                           
                            SHOP
                            
                             </Link>
                            <Link to="/courses" className="nav_links">

                            COURSES
                            
                             </Link>
                            <Link to="/aboutus" className="nav_links">

                            ABOUT US                            
                             </Link>
                           
                               <Link to="/presignup" style={{marginLeft: '700px'}}className="nav_links">

SIGNUP                          </Link>
<Nav className='about'>
           
            {userInfo?(
                    <NavDropdown title={userInfo.lastName + " " + userInfo.firstName} id="username">
                        <LinkContainer to='/profile'>
                            <NavDropdown.Item >Profile</NavDropdown.Item>
                        </LinkContainer>
                        <NavDropdown.Item onClick={logoutHandler} >Logout</NavDropdown.Item>
                    </NavDropdown>
            ): 
            <LinkContainer to='/'>
            <Nav.Link >
             Sign in
            </Nav.Link>
            </LinkContainer>}
            
          </Nav>

                          

                            
                              <a  className="nav_links">             
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