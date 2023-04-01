import {gql}  from '@apollo/client'

const getProjects = gql`

query getProjects{
    projects
        {
            id
            name
    description
    imageUrl
    projectCreator{
      firstName
      lastName
      email
    }
        }
        
    
}

`;
const getProject = gql`
    query getProject($id:ID){
        project(id:$id){
            description
            imageUrl
            projectCreator{
            firstName
            lastName
            email
            }
            }
        }
`;
export {getProject,getProjects}