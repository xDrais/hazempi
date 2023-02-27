import React, { Component } from 'react';
import { useState, useEffect } from "react"

import './navbar.css'
import { FaCartPlus} from "react-icons/fa";
import { Navbar} from 'react-bootstrap';
import { Collapse} from 'reactstrap';
import Example from './sidemenu';
import { Link } from "react-router-dom";


function Navbarr () {
   
  
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
<Link to="/login" className="navlinkmargin nav_links">

  
SIGNIN                         </Link>

                          

                            
                              <a  className="nav_links">  <FaCartPlus color="white" fontSize="25px" />            
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