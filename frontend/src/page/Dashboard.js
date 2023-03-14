import NavBar from "../Components/Dashboard/NavBar";
import Header from "../Components/Dashboard/Header";
import Footer from "../Components/Dashboard/Footer";
import { DashboardHTML } from "../Components/dashboard";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import React, {useState,useEffect} from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getUsers,approveUser } from "../userredux/useraction";
import GetSponsor from './GetSponsor ';
import { Route  , Link, NavLink, Navigate, useNavigate} from 'react-router-dom';







 function Dashboard  () {



  const dispatch = useDispatch();
  const users = useSelector((state) => state.userDisplay.userInfo);

let navigate =useNavigate()
  console.log(users);
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);


  const handleApprove = (id, role) => {
    dispatch(approveUser(id, role));
  };
 
 const detailRole=(role , id )=>{
  let path =`/${role}/${id}`
        navigate(path)
 };

    return ( <>
<div>    <div>{ReactHtmlParser(DashboardHTML)}   </div>
</div>;        <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
          <NavBar />
          <div className="layout-page">
      <Header/>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> List Account</h4>
        <div className="card">
       
                <h5 className="card-header">Accounts</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>CIN</th>
                        <th>Image</th>
                        <th>Role</th>
                        <th>Status</th>
                        <th>Role Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    
                    <tbody className="table-border-bottom-0">
                      
                        {Array.isArray(users) && users.map((i) => {
                          
                          return(
                              
                            <tr key={i.id}>
                            
                          <td><i className="fab fa-angular fa-lg text-danger me-3"></i>{i.firstName}</td>
                          <td> {i.lastName}</td> 
                        <td>
                        {i.email}
                        </td>
                        <td>
                        {i.phone}
                        </td>
                        <td>
                        {i.cin}
                        </td>
                        <td>
                        <img src={`http://localhost:5000/${i.imageUrl}`} alt="User Image" />
                        </td>
                        <td>
                        <span className="badge bg-label-primary me-1">{i?.role?.name}</span>
                        </td>
                        <td ><span className={i.verify === true ? 'badge bg-label-success me-1' : 'badge bg-label-warning me-1'}>{i.verify ? 'Verifed': 'Not-Verifed'}</span>
                        <span className={i.bloque === true ? 'badge bg-label-warning me-1' :'badge bg-label-success me-1' }>{i.bloque ? 'Blocked': 'Not-Blocked'}</span></td>
                        <td >    <span className={i.status === 'pending' ? 'badge bg-label-warning me-1' : 'badge bg-label-success me-1'}>{i.status === 'approved' ? 'approved' : 'pending'}</span></td>

                        <td>
                        <DropdownButton title="Actions">
                        {i.status === "pending" && (
                     <>
                    {i?.role?.name === "userRole" || typeof i.role === "undefined" ? (
                        <>
                    <Dropdown.Item onClick={() => handleApprove(i._id, "sponsor")}><i className="bx bx-edit-alt me-1"></i> Approve Sponsor</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleApprove(i._id, "coach")}><i className="bx bx-edit-alt me-1"></i>Approve Coach</Dropdown.Item>
                        </>
                      ) : null}
                   </>
                       )}
                      <Dropdown.Item href="#/action-1"> <i className="bx bx-edit-alt me-1"></i> Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-2"> <i className="bx bx-trash me-1"></i>Block</Dropdown.Item>
                      <Dropdown.Item onClick={() => detailRole(i?.role?.name, i._id)}><i className="bx bx-edit-alt me-1"></i>details</Dropdown.Item>

                                 
                          </DropdownButton>
                        </td>
                        
                        </tr>
                          )
                        })}                     
                    </tbody>
                  </table>
                 
                </div>
              </div> 
                
        </div>
        <Footer/>  
         </div> </div>
        
        </div> </div>
      
        
</>
     );
}
export default Dashboard

