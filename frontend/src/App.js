import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TeamForm from './components/TeamForm';
import ProjectCard from './components/ProjectCard';
import ProjectForm from './components/ProjectForm';



function App() {
  const PROJECTS_API_URL = 'http://127.0.0.1:8000/api/projects/';
  const TEAMS_API_URL = 'http://127.0.0.1:8000/api/teams/';

  const [projects,setProjects] = useState([]);
  const [projectToEdit,setProjectToEdit] = useState(null);
  const [teams,setTeams] = useState([]);

  useEffect(()=>{
    
   axios.get(`${PROJECTS_API_URL}`)
   .then(response =>{
     setProjects(response.data);
   })
   .catch(error=>{
      console.error('There was an error while getting the projects!',error);
   });

   axios.get(`${TEAMS_API_URL}`)
   .then(response =>{
     setTeams(response.data);
   })
   .catch(error=>{
      console.error('There was an error while getting the projects!',error);
   });

  },[]);
  

  return (
    <div className="App">
      <TeamForm></TeamForm>
      <ProjectForm teams={teams} projectToEdit={projectToEdit} setProjectToEdit={setProjectToEdit} projects={projects} setProjects={setProjects}></ProjectForm>
      <h2>List of Projects</h2>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} teams={teams} projects={projects} setProjects={setProjects} setProjectToEdit={setProjectToEdit}></ProjectCard>
      ))}

    </div>
  );
}

export default App;
