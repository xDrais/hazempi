import {useQuery,useMutation} from '@apollo/client'
import  {getProjects} from '../../Query/projectQuery'
import { delete_Project } from '../../Mutation/projetMutation';
import { useNavigate } from 'react-router-dom';
import {Image} from 'react-bootstrap'
import './Projectsss.css'
const Getallprojects = () => {
    const {loading,error,data} = useQuery(getProjects)
  const navigate = useNavigate();

    const [deleteProject] =useMutation(delete_Project
  )
    const deleteproj=(id)=>{
      deleteProject({
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
{data?.projects.length>0 ? (
        data?.projects.map((p)=>(
		<div class="table-content" key={p.id}>	
			<div class="table-row">		
				<div class="table-data">{p.name}</div>
				<div class="table-data"> {p.description}</div>
        <div class="table-data">
          <input type="button" value="delete" onClick={() => deleteproj(p.id)}  ></input>
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

    </>
  )
}

export default Getallprojects





