import React, { useState } from 'react'
import backg from "./backg.jpg";
import "./project.css"
import  {getProjects} from '../../Query/projectQuery'
import { useSelector } from 'react-redux';
import {useQuery,useMutation} from '@apollo/client'
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap'
import Loader from '../../Components/Loader'

const AllProject = () => {
  const [limit,setLimit]=useState(1)
  const page=20
  const {loading,error,data,client} = useQuery(getProjects,{variables:{
    page,limit:parseInt(limit)
  }})

  client.resetStore()

  return (
    <>
     <body style={{backgroundImage:`url(${backg})`,height:"1900px"}}>
   <div style={{marginBottom:"-130px",color:"beige"}}><h1 style={{color:"white"}}className="SectionTitle">Projects</h1>
       <p style={{color:"white"}} className="paragraph2">our students' Project </p></div> 
       {loading && <Loader></Loader>}

   <div className="shopcontainer">
   {data?.projects.map((p) => (
          <Link to={`/project/${p.id}`} key={p.id} >
  
          <div align="center" className="containerproduit" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/${p.imageUrl})`}}>
      <div className="overlay" draggable="false">
        <div className = "items head">
          <p>{p?.name}</p>
        </div><hr />
        <div className = "items price">
          <p className="new">{p.description} </p>
        </div>
        <Card.Text as='div'>   
          </Card.Text>
    </div>
    </div> </Link>
        ))}
   
   </div>
   </body>  </>
  )
}

export default AllProject;