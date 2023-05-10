import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Container ,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {update_Project} from '../../Mutation/projetMutation'
import { useParams, Link, useNavigate} from 'react-router-dom'
import backg from "./backg.jpg";
import axios from 'axios'

const Updateproject = () => {

    const [name,setName]=useState(()=>{return ""})
    const [description,setDescription]=useState("")
    const [imageUrl, setImageUrl] = useState("");
    const [ammounttocollect, setAmmounttocollect] = useState(0);
    const navigate=useNavigate()
    const {id} = useParams()

    const [updateProject] =useMutation(update_Project,{
        variables:{name,description,imageUrl,ammounttocollect:parseInt(ammounttocollect),id}
    })

   
   const submitHandler=async(e)=>{
    e.preventDefault();
    updateProject(name,description,imageUrl,ammounttocollect,id)
  

  }
  const imageupload=async(e)=>{
    e.preventDefault();

    const image=  e.target.files[0]

    const formdata = new FormData();
    formdata.append('imageUrl',image)

    try {
      const config = {
        Headers:{
          'Content-Type':'multipart/form-data'
        }
      }
      const {data} = await axios.post(`http://localhost:5000/image`, formdata,config );
      console.log(data)
      setImageUrl(data.message)
      console.log(imageUrl)

    } catch (error) {
      console.error(error);
    }
  }

  return (
 <>
   <body style={{backgroundImage:`url(${backg})`,height:'720px'}}>
      

    
       <center><h3 className="py-5">Update Project</h3></center>
      <Col md={6} style={{float:'right',marginRight:'450px'}}>
      <Form  onSubmit={submitHandler}>
            <Form.Group controlId="name">
                <Form.Label>
                   
                </Form.Label>
                <Form.Control
                 type="name"
                 placeholder="name"
                 minLength={8}
                 value={name}
                 onChange={(e)=>
                    setName(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>
                   
                </Form.Label>
                <Form.Control
                 type="description"
                 placeholder="description"
                 minLength={8}
                 value={description}
                 onChange={(e)=>
                    setDescription(e.target.value)}>
                </Form.Control>
            
            </Form.Group>
            
            <Form.Group controlId="ammounttocollect">
                <Form.Label>
                   
                </Form.Label>
                <Form.Control
                 type="number"
                 placeholder="ammounttocollect"
                
                 value={ammounttocollect}
                 onChange={(e)=>
                    setAmmounttocollect(e.target.value)}>
                </Form.Control>
            
            </Form.Group>


         


            <Form.Group controlId="imageUrl">
                <Form.Label>
                   
                </Form.Label>
                <Form.Control 
                type="file"
                name="imageUrl"
                accept=".png, .jpg, .jpeg"
                onChange={imageupload}  
                 >
                </Form.Control>
            </Form.Group>
            <div className='py-5'>
            <Button  type="submit"  variant="primary" >Submit</Button>
            </div>        
            </Form>
      </Col>
      </body>
    </>  )
}

export default Updateproject