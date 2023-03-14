import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { DashboardHTML } from "../Components/dashboard";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import NavBar from "../Components/Dashboard/NavBar";
import Header from "../Components/Dashboard/Header";
import Footer from "../Components/Dashboard/Footer";



const GetSponsor = () => {
  const [sponsor, setSponsor] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id , role } = useParams();
  useEffect(() => {
    const getSponsor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/user/${role}/${id}`, { method: 'GET' });
        const data = await response.json();
        setSponsor(data.sponsor);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
  
    getSponsor();
  }, [id , role]);
  if (loading) {
    return <p>Loading...</p>;
  }

  if (!sponsor) {
    return <p>Sponsor not found</p>;
  }

  return ( <>
    <div>    <div>{ReactHtmlParser(DashboardHTML)}   </div>
    </div>
    
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
          <NavBar />
          <div className="layout-page">
      <Header/>
      <div className="content-wrapper">
        <div className="container-xxl flex-grow-1 container-p-y">
        <h4 className="fw-bold py-3 mb-4"><span className="text-muted fw-light"></span> Deatais Sponsor</h4>
        <div className="card">
       
                <h5 className="card-header">Details</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table table-striped">
                    <thead>
                    {role ==="sponsor" ? (
                      <tr>
                        <th>Entreprise Name</th>
                        <th>Sector</th>
                        <th>Description Sponsor</th>
                        <th>Actions</th>
                      </tr>
                    ) :  role === "coach" ?(
                        <tr>
                        <th>Description Coach </th>
                        <th>Speciality</th>
                        <th>Date Debut Experience </th>
                        <th>Date Fin Experience  </th>
                        <th>Titre Poste</th>
                        <th>Certification  </th>
                        <th>Actions</th>
                      </tr>
                    ): null}
                    </thead>
                    
                    <tbody className="table-border-bottom-0">   
                    {role ==="sponsor" ? (                           
                            <tr >
                          <td><i className="fab fa-angular fa-lg text-danger me-3"></i> {sponsor.entrepriseName}</td> 
                        <td>
                        {sponsor.sector}
                        </td>
                        <td>
                        {sponsor.descriptionSponsor}
                        </td>
                        <td>
                        <DropdownButton title="Actions">
                      <Dropdown.Item href="#/action-1"> <i className="bx bx-edit-alt me-1"></i> Edit</Dropdown.Item>
                      <Dropdown.Item href="#/action-2"> <i className="bx bx-trash me-1"></i>Block</Dropdown.Item>      
                          </DropdownButton>
                        </td>
                        
                        </tr> 
                        ) :  role === "coach" ? ( 
                            <tr >
                            <td><i className="fab fa-angular fa-lg text-danger me-3"></i> {sponsor.descriptionCoach}</td> 
                          <td>
                          {sponsor.speciality}
                          </td>
                          <td>
                          {sponsor.dateDebutExperience}
                          </td>
                          <td>
                          {sponsor.dateFinExperience}
                          </td>
                          <td>
                          {sponsor.titrePoste}
                          </td>
                          <td>
                          {sponsor.certification}
                          </td>
                          <td>
                          <DropdownButton title="Actions">
                        <Dropdown.Item href="#/action-1"> <i className="bx bx-edit-alt me-1"></i> Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-2"> <i className="bx bx-trash me-1"></i>Block</Dropdown.Item>      
                            </DropdownButton>
                          </td>
                          
                          </tr> 
                            ): null}
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
};

export default GetSponsor;