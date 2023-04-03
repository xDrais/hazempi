import {useQuery,useMutation} from '@apollo/client'
import  {getEvents} from '../../Query/eventQuerry'
import { delete_Event } from '../../Mutation/eventMutation';
import { useNavigate } from 'react-router-dom';

import './Eve.css'
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
      navigate(`/updateproject/${id}`)

    }


  return (
    <>
   <div class="container">
  
	<div class="table">
		<div class="table-header">
			<div class="header__item"><a id="name" class="filter__link" >Name</a></div>
			<div class="header__item"><a id="description" class="filter__link filter__link--number" >description</a></div>
			<div class="header__item"><a id="losses" class="filter__link filter__link--number" >update</a></div>
			<div class="header__item"><a id="total" class="filter__link filter__link--number" >delete</a></div>
		</div>
    {data?.events.length>0 ? (
data?.events.map((p)=>(
		<div class="table-content" key={p.id}>	
			<div class="table-row">		
				<div class="table-data">{p.name}</div>
				<div class="table-data"> {p.description}</div>

        <div class="table-data">
          <input type="button" value="delete" onClick={() => deleteevent(p.id)}  ></input>
         </div>
        <div class="table-data">
          <input type="button" value="update" onClick={() => gotoupdate(p.id)} ></input>
                        
        </div>

			</div>
		</div>	
    ))
    ):(<p>no projects</p>)}
    </div>
</div>
</>  )
}

export default Getallevents