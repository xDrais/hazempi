import {useQuery,useMutation} from '@apollo/client'
import { delete_Event } from '../../Mutation/eventMutation';
import  {getEvent} from '../../Query/eventQuerry'
import { useParams } from 'react-router-dom'
import backg from "./backg.jpg";
import { Button,  Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Input from '../../page/Input';
import {  participateEvent,getPart} from "../../redux/action";


const Event = () => {
  const [d,setD]=useState(false)
  const [b,setB]=useState(false)
  const {id}=useParams()
  const navigate = useNavigate()
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch =useDispatch()

  const participateevent = useSelector((state) => state.participateevent);
  const { success,part } = participateevent;
  console.log(part)
  useEffect(() => {
    dispatch(getPart())
    { part?.ev.map((e)=>{
      if (e.participant.find(d=>d===userInfo._id)) {
        console.log('hey')
      }else
      console.log('t')
    })}
    
   }, []);

  const [deleteEvent] =useMutation(delete_Event)
  const deleteevent=(id)=>{
    deleteEvent({
      variables: { id: id },
    })
    console.log(id) 

  }
  const gotoupdate=(id)=>{
    navigate(`/updateevent/${id}`)

  }
  const gotomeet=(id)=>{
    navigate(`/video/${id}`)

  }
  const gotoparticipate=(idevent,userid)=>{
    console.log(idevent)
    console.log(userid)
   
    if (window.confirm('are you sure')){
    dispatch(
      participateEvent(
        {eventId:idevent,userId:userid}
   
      )
     
    );
    setD(true)
    console.log('done')}else
    window.alert('cancled')

  }
    const {loading,error,data,client} = useQuery(getEvent,{variables:{id:id}})

    client.resetStore()

  return (
    <>

<body style={{backgroundImage:`url(${backg})`}}>
               
               {data ? ( 
       <div className="containerdetail">
 <div className="images">
 <img className="img" src={`${process.env.PUBLIC_URL}/images/${data?.event?.imageUrl}`}  />
 </div>
 <div className="product1"> 
 
   <p className="pdetail"> {data?.event?.name}- by {data?.event?.projectCreator?.firstName} {data?.event?.projectCreator?.lastName}</p>
   {/* <h1 className="h1detail">{data?.event.data?.eventName}</h1> */}
   <h2 className="h2detail">{data?.event?.participantsnumber} Member </h2>
   <p className="desc pdetail">{data?.event?.description}</p>
   
  {d ?<Button variant='info' className='btn-sm'onClick={() => {gotomeet(data?.event.id)}} >
                        Meet
                     </Button>:<Button variant='dark' className='btn-sm'onClick={() => {gotoparticipate(data?.event.id,userInfo._id)}} >
                        Participate
                     </Button>}
  {userInfo.role.name==='sponsorRole'&& <> <Button variant='light' className='btn-sm' onClick={() => {gotoupdate(data?.event.id)}}>
                         <i className='fas fa-edit'></i>
                     </Button>
                     <Button variant='success' 
                        className='btn-sm' 
                        onClick={() => {navigate('/addevent')}}
                        > add
                        <i class="fa-sharp fa-solid fa-plus"></i>
                        </Button>
                     
                     <Button variant='danger' 
                     className='btn-sm' 
                     onClick={() => {deleteevent(data?.event.id)}}
                     >
                      <i className='fas fa-trash'></i>
                     </Button>
                     <Button variant='info' className='btn-sm'onClick={() => {navigate(`/meet`)}} >
                     Create Meet
                  </Button>
                  </>}

  
</div>
<Row>  
            <Col style={{marginLeft:"50px" ,marginBottom:'50px'}}md={10}>
            <h2>Donation</h2>
            
                {b? <Input/> :<Button variant='info' 
                     className='btn-sm' 
                     onClick={() => {setB(true)}}
                     > send money
                     </Button>}
            </Col>
  
            </Row>
          
   
           </div> ):<>not found</>}
</body> </>
      )
}

export default Event