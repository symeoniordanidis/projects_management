import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import TeamForm from './components/TeamForm';
import ProjectCard from './components/ProjectCard';



function App() {
  const API_URL = 'http://127.0.0.1:8000/api/projects/';
  const [projects,setProjects] = useState([]);

  useEffect(()=>{
    
   axios.get(`${API_URL}`)
   .then(response =>{
    console.log(response);
     setProjects(response.data);
   })
   .catch(error=>{
      console.error('There was an error while getting the projects!',error);
   });
  },[]);
  

  return (
    <div className="App">
      <TeamForm></TeamForm>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project}></ProjectCard>
      ))}

    </div>
  );
}

export default App;
