import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {add_Event} from '../../Mutation/eventMutation'

const Addproject = () => {

    const [name,setName]=useState(()=>{return ""})
    const [description,setDescription]=useState("")
    const [imageUrl, setImageUrl] = useState("");
    
    
    const userLogin =useSelector(state =>state.userLogin)
    const {userInfo} =userLogin
    const projectCreator =userInfo._id
    const [addProject] =useMutation(add_Event,{
        variables:{name,description,imageUrl,projectCreator}
    })


   
    
      

   const submitHandler=async(e)=>{
        e.preventDefault();
        console.log(imageUrl)
        console.log(typeof imageUrl.name)
        console.log(imageUrl.name)
        console.log(projectCreator)
        addProject(name,description,imageUrl,projectCreator)
      }

  return (
    <>
  <Container>
    <div className='hero-container'>

      <Form className='login' onSubmit={submitHandler}>
      <center><h3 className="sign">ADD Project</h3></center>

            <Form.Group controlId="name">
                <Form.Label>
                   name
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
                   description
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
            <Form.Group controlId="imageUrl">
                <Form.Label>
                   imageUrl
                </Form.Label> 
                <Form.Control 
                type="file"
                name="imageUrl"
                accept=".png, .jpg, .jpeg"
                onChange={(e) => setImageUrl(e.target.files[0].name)}  
                 >
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" >Submit</Button>
        </Form>
        </div>
    </Container>
    </>
  )
}

export default Addproject





