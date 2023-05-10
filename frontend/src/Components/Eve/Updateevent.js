import React,{ useState} from 'react'
import { useMutation } from '@apollo/client'
import { Form ,Button,Col} from 'react-bootstrap'
import { useSelector } from 'react-redux'
import {update_Event} from '../../Mutation/eventMutation'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import backg from "./backg.jpg";

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

  const navigate=useNavigate()

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
  var today = new Date();


  const submitHandler=async(e)=>{
    e.preventDefault();

    updateEvent(name,description,dateEnd,participantsnumber,imageUrl,id)


  }


  return (
   <>
<body style={{backgroundImage:`url(${backg})`,height:'720px'}}>
       <center><h3 className="py-5">Update Event</h3></center>
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
 <Form.Group controlId="dateEnd">
                <Form.Label>
                </Form.Label>
                <Form.Control 
                 type="date"
                 placeholder="Date End"
                 value={dateEnd} 
                 min={today}
                 onChange={(e)=> 
                  setDateEnd(e.target.value)}>
                </Form.Control>
            </Form.Group>
<Form.Group controlId="participantsnumber">
                <Form.Label>
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
    </>
     )
}

export default Updateevent