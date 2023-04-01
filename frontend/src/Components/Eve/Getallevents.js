import {useQuery,useMutation} from '@apollo/client'
import  {getEvents} from '../../Query/eventQuerry'

const Getallevents = () => {
    const {loading,error,data} = useQuery(getEvents)
  return (
    <>
    <div className="card">
<div >
{data?.events.length>0 ? (
data?.events.map((p)=>(
  <h1 key={p.id}>
          <table className="table">
            <thead>
            
            <tr>
              <th>name </th>
              <th>description</th>
              <th>id</th>

            </tr>
           
            </thead>
            
            <tbody className="table-border-bottom-0">   
                                     
                    <tr >
                <td>
                {p.name}
                </td>
                <td>
                {p.description}
                </td>
             
        
            
                
                </tr> 
                
                    
                   
            </tbody>
          </table>
         
  </h1>
  ))
):(<p>no events</p>)}
</div>
</div>

</>  )
}

export default Getallevents