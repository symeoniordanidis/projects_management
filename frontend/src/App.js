import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TeamForm from './components/TeamForm';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';



function App() {
  const BASE_URL = process.env.REACT_APP_BASE_API_URL;
  const PROJECTS_API_URL = BASE_URL + '/projects/';
  const TEAMS_API_URL = BASE_URL + '/teams/';

  const [projects,setProjects] = useState([]);
  const [projectToEdit,setProjectToEdit] = useState(null);
  const [teams,setTeams] = useState([]);

  //Get projects and teams when the component mounts
  useEffect(()=>{
  
   //Get projects
   axios.get(`${PROJECTS_API_URL}`)
   .then(response =>{
     console.log(response);
     setProjects(response.data);
   })
   .catch(error=>{
      console.error('There was an error while getting the projects!',error);
   });

   //Get teams
   axios.get(`${TEAMS_API_URL}`)
   .then(response =>{
     console.log(response);
     setTeams(response.data);
   })
   .catch(error=>{
      console.error('There was an error while getting the projects!',error);
   });

  },[]);
  

  return (
    <div className="App">
      
      <div className='forms-container'>
        <TeamForm></TeamForm>
        <ProjectForm teams={teams} projectToEdit={projectToEdit} setProjectToEdit={setProjectToEdit} projects={projects} setProjects={setProjects}></ProjectForm>
      </div>
      <h2>List of Projects</h2>
      <div className="projects-container">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} teams={teams} projects={projects} setProjects={setProjects} setProjectToEdit={setProjectToEdit}></ProjectCard>
        ))}
      </div>
    </div>
  );
}

export default App;
