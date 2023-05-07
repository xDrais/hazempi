import React, {  useState } from 'react'
import backg from "./backg.jpg";
import {useQuery,useMutation} from '@apollo/client'
import { delete_Project } from '../../Mutation/projetMutation';

import  {getProject} from '../../Query/projectQuery'
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Col, Form, ListGroup, Row } from 'react-bootstrap';
import "./project.css"
import { useDispatch, useSelector } from 'react-redux';
import {projectcomment,unprojectcomment} from '../../redux/action'

const DetailProject = () => {
    const {id} =useParams()
    const navigate = useNavigate()
    const dispatch=useDispatch()
    const userLogin = useSelector((state)=>state.userLogin)
    const {userInfo} = userLogin
    const [comment,setComment]=useState({
        like:false,
        msg:"",
        user:userInfo._id
    })
    const [deleteProject] =useMutation(delete_Project
      )
        const deleteproj=(id)=>{
          if (window.confirm('Are you sure')) {
          deleteProject({
            variables: { id: id },
          })
    
        }
        }
    const {data,refetch} = useQuery(getProject,{variables:{
        id
      }})
      console.log(data)
      const likee=()=>{
        setComment(pres=>({
            ...comment,like:true
        }))
      }
      const unlikee=()=>{
        setComment(pres=>({
            ...comment,like:false
        }))
      }

      const submitHandler=(e)=>{
        e.preventDefault()
        setComment(pres=>({
            ...comment,user:userInfo
        }))
        setComment(pres=>({
            ...comment,like:true
        }))
        console.log(id)
        dispatch(projectcomment({comment:comment,id:id}))
        setComment(pres=>({
            ...comment,msg:""
        }))
        
    }
    
    return (
        <>    <body style={{backgroundImage:`url(${backg})`}}>
               
                {data ? ( 
        <div className="containerdetail">
  <div className="images">
  <img className="img" src={`${process.env.PUBLIC_URL}/images/${data?.project?.imageUrl}`}  />
  </div>
  <div className="product1"> 
  
    <p className="pdetail"> {data?.project?.name}- by {data?.project?.projectCreator?.firstName} {data?.project?.projectCreator?.lastName}</p>
    {/* <h1 className="h1detail">{data?.project.data?.projectName}</h1> */}
    <h2 className="h2detail">{data?.project?.ammounttocollect} Dt </h2>
    <p className="desc pdetail">{data?.project?.description}</p>
    {userInfo.email===data?.project?.projectCreator.email&& <> <Button variant='light' className='btn-sm' onClick={() => {navigate(`/updateevent/${data?.project?.id}`)}}>
                         <i className='fas fa-edit'></i>
                     </Button>
                     <Button variant='success' 
                        className='btn-sm' 
                        onClick={() => {navigate('/addproject')}}
                        > add
                        <i class="fa-sharp fa-solid fa-plus"></i>
                        </Button>
                     
                     <Button variant='danger' 
                     className='btn-sm' 
                     onClick={() => {deleteproj(data?.project?.id)}}
                     >
                      <i className='fas fa-trash'></i>
                     </Button></>}
    {!comment.like  ? <i onClick={likee} className="fa-regular fa-heart fa-2xl" style={{color:" #EB1414"}}></i>:<i onClick={unlikee} className="fa-solid fa-heart fa-2xl" style={{color: "#EB1414"}}></i>}

   
</div>

   
            <Row>  
            <Col style={{marginLeft:"50px"}}md={10}>
          <h3> Comment Section</h3>
          <ListGroup style={{paddingBottom:"50px"}} variant="flush">
            {data?.project?.comment?.map((review)=>
              <ListGroup.Item  key={review?.id} >
                <strong>{review?.user.firstName} {review?.user.lastName}</strong> 
                <p>{review?.msg}</p>
                
               
                  
              </ListGroup.Item>
            )}
            <ListGroup.Item>
              <h2>Write a Comment </h2>
              {userInfo ? (
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="comment">
                  <Form.Label>Comment</Form.Label>
                  <Form.Control as='textarea' rows='3'
                   value={comment.msg}
                    onChange={(e)=>setComment(pres=>({
                        ...comment,msg:e.target.value
                    }))} 
                    ></Form.Control>

                </Form.Group>
                   <Button type="submit" onClick={() => refetch({cancelRefetch:false})} style={{color:"orange",backgroundColor:"#00008B"}}> submit</Button>
              </Form>):""}
            </ListGroup.Item>  

          </ListGroup>
        </Col>
            </Row>
           
    
            </div> ):<>not found</>}
 </body> </>
    )
}

export default DetailProject