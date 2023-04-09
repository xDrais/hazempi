import {useQuery,useMutation} from '@apollo/client'
import  {getEvents} from '../../Query/eventQuerry'
import { useNavigate } from 'react-router-dom';
import {Button,Table} from 'react-bootstrap'
import  Loader  from '../Loader'
import  Message  from '../Message'
import './Eve.css'
const Participant = () => {
    const navigate = useNavigate();
    const {loading,error,data} = useQuery(getEvents)
    const meet=(id)=>{
        navigate(`/video/${id}`)
       }
  return (
    <>
 
    <h1 className='py-5'>Participant</h1>
   

    {loading ? <Loader></Loader> : error ? <Message>{error}</Message>:(
      <>
      
    
         <Table striped bordered hover responsive className='table-sm'>
 
         <thead>
             <tr>
                 <th>Name</th>
                 <th>Description</th>      
             </tr>
         </thead >
         <tbody>
         {data?.events.map(event => (
             <tr key={event.id}>
             <td>{event.name}</td>
             <td>{event.description}</td>
             <td><Button variant='info' 
                  className='btn-sm ' 
                  onClick={() => {meet(event.id)}}
                  > Join Meet 
                    <i class="fa-regular fa-handshake"></i>                 
                     </Button>
                  </td>
             <td></td>
             </tr>
         ))}
         

         </tbody>
     </Table>
     </>
    )}

    </>
     )
}

export default Participant