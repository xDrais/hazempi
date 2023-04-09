import {useQuery,useMutation} from '@apollo/client'
import  {getEvents} from '../../Query/eventQuerry'
import { delete_Event } from '../../Mutation/eventMutation';
import { useNavigate } from 'react-router-dom';
import {Button,Table} from 'react-bootstrap'
import  Loader  from '../Loader'
import  Message  from '../Message'
import './Eve.css'
import { useState } from 'react';

const Getallevents = () => {

  const navigate = useNavigate();
    const {loading,error,data} = useQuery(getEvents)
    
    

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
    const addevent=()=>{
      navigate(`/addevent`)
     }
    const meet=(id)=>{
      navigate(`/video/${id}`)
     }
    
  return (
    <>

    <h1 className='py-5'>Event</h1>
   
    {console.log(loading)}
    {loading ? <Loader></Loader> : error ? <Message>{error}</Message>:(
      <>
      <Button variant='success' 
      className='btn-sm offset-10' 
      onClick={() => {addevent()}}
      > add
       <i class="fa-sharp fa-solid fa-plus"></i>
      </Button>
    
         <Table striped bordered hover responsive className='table-sm'>
 
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Description</th>   
                 <th>participantsnumber</th>   
                 <th>Start Meet</th>   
             </tr>
         </thead >
         <tbody>
         {data?.events.map(event => (
             <tr key={event.id}>
             <td>{event.name}</td>
             <td>{event.description}</td>
             <td>{event.participantsnumber}</td>
             <td><Button variant='info' 
                  className='btn-sm ' 
                  onClick={() => {meet(event.id)}}
                  > meet
                  <i class="fa-regular fa-handshake"></i>
                  </Button>
                  </td>
             <td>
                 <div >
                 <Button variant='light' className='btn-sm' onClick={() => {gotoupdate(event.id)}}>
                         <i className='fas fa-edit'></i>
                     </Button>
                 </div>
                 <Button variant='danger' 
                     className='btn-sm' 
                     onClick={() => {deleteevent(event.id)}}
                     >
                      <i className='fas fa-trash'></i>
                     </Button>
                     
                     
             </td>

             </tr>
         ))}
         

         </tbody>
     </Table>
     </>
    )}

    </>
     )
}

export default Getallevents