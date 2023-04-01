import {useQuery,useMutation} from '@apollo/client'
import  {getProjects} from '../../Query/projectQuery'
import { delete_Project } from '../../Mutation/projetMutation';

const Getallprojects = () => {
    const {loading,error,data} = useQuery(getProjects)

    const id = '6425b72d212e2c064aa94fc4'
    const [deleteProject] =useMutation(delete_Project,{
      variables:{id}
  })
    const deleteproj=(id)=>{
      deleteProject(id)
      console.log(id) 
    }

  return (
    <>
              <div className="card">
    <div >
        {data?.projects.length>0 ? (
        data?.projects.map((p)=>(
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
                       
                  
                          <td>
                        <input type="button" value="delete" onClick={() => deleteproj(p.id)}  ></input>
                        
                          </td>
                          
                          </tr> 
                          
                              
                             
                      </tbody>
                    </table>
                   
            </h1>
            ))
        ):(<p>no projects</p>)}
     </div>
     </div>

    </>
  )
}

export default Getallprojects





