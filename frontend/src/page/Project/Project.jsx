import React from 'react'
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap'
const Project = ({project}) => {
    return(
        <Link to={`/productdetail/${project.id}`} key={project.id} >
  
        <div align="center" className="containerproduit" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/images/${project.imageUrl})`}}>
    <div className="overlay" draggable="false">
      <div className = "items head">
        <p>{project?.name}</p>
      </div><hr />
      <div className = "items price">
        <p className="new">{project.description} </p>
      </div>
      <div className = "items price">
        <p className="new">{project.ammounttocollect} </p>
      </div>
      <Card.Text as='div'>   
        </Card.Text>
  </div>
  </div> </Link>
  
     )
  
  }

export default Project