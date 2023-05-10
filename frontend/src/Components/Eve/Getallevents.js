import {useQuery,useMutation} from '@apollo/client'
import  {getEvents} from '../../Query/eventQuerry'
import { delete_Event } from '../../Mutation/eventMutation';
import { useNavigate } from 'react-router-dom';
import {Button,Table} from 'react-bootstrap'
import  Loader  from '../Loader'
import  Message  from '../Message'
import './Eve.css'
import { useDispatch, useSelector } from 'react-redux';
import {  participateEvent,getPart} from "../../redux/action";
import { useEffect } from 'react';
import backg from "./backg.jpg";
import { Link } from "react-router-dom";
import { Card } from 'react-bootstrap'

const Getallevents = () => {

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const participateevent = useSelector((state) => state.participateevent);
  const { success,part } = participateevent;

  
  const getpart = useSelector((state) => state.getpart);
  const { success:succ,part:getpa } = getpart;
  console.log('===============')
 
  const navigate = useNavigate();
    const {loading,error,data,ref,client} = useQuery(getEvents)

    const dispatch = useDispatch();

    const [deleteEvent] =useMutation(delete_Event)
 
    
    const gotoparticipate=(idevent,userid)=>{
    

      dispatch(
        participateEvent(
          {eventId:idevent,userId:userid}
     
        )
       
      );
      console.log(success)
      console.log(part)
    }
    const gotoupdate=(id)=>{
      navigate(`/updateevent/${id}`)

    }
    const addevent=()=>{
      navigate(`/addevent`)
     }

     useEffect(() => {
      dispatch(getPart())
     
      
     }, []);

     client.resetStore()

  return (
    <>
    <> <body style={{backgroundImage:`url(${backg})`,height:"1900px"}}>
   <div style={{marginBottom:"-130px",color:"beige"}}><h1 style={{color:"white"}}className="SectionTitle">EVENTS</h1>
       <p style={{color:"white"}} className="paragraph2"> </p></div> 
       
   <div className="shopcontainer">
   {data?.events.map((p) => (
          <Link to={`/event/${p.id}`} key={p.id} >
  
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
   

    </>
     )
}

export default Getallevents