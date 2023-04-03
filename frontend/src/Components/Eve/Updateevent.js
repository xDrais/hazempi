import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {update_Event} from '../../Mutation/eventMutation'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Updateevent = () => {

  const [name,setName]=useState(()=>{return ""})
  const [description,setDescription]=useState("")
  const [imageUrl, setImageUrl] = useState("");
  const [dateEnd, setDateEnd] = useState("");
  const [participantsnumber, setParticipantsnumber] = useState("");
  
  const userLogin =useSelector(state =>state.userLogin)
  const {userInfo} =userLogin
  const {id} = useParams()
  console.log(id)
  const [updateEvent] =useMutation(update_Event,{
      variables:{name,description,dateEnd,participantsnumber:parseInt(participantsnumber),imageUrl,id}
  })


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




  const submitHandler=async(e)=>{
    e.preventDefault();

    updateEvent(name,description,dateEnd,participantsnumber,imageUrl,id)
  }


  return (
    <Container>
       <div>
    </div>
    <div className='hero-container'>

      <Form className='login' onSubmit={submitHandler}>
      <center><h3 className="sign">ADD Event</h3></center>

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


            <Form.Group controlId="dateEnd">
                <Form.Label>
                Date End
                </Form.Label>
                <Form.Control 
                 type="date"
                 placeholder="Date End"
                 value={dateEnd} 
                 onChange={(e)=> 
                  setDateEnd(e.target.value)}>
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="participantsnumber">
                <Form.Label>
                   Participants Number
                </Form.Label>
                <Form.Control 
                 type="Number"
                 placeholder="participants number"
                 value={participantsnumber} 
                 onChange={(e)=> 
                    setParticipantsnumber(e.target.value)}>
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
                onChange={imageupload}  
                 >
                </Form.Control>
            </Form.Group>
            <Button type="submit" variant="primary" >Submit</Button>
        </Form>
        </div>
    </Container>
     )
}

export default Updateevent