import React from 'react';
import axios from 'axios';

function ProjectCard({projects,setProjects,setProjectToEdit,project,teams}){

    const API_URL = 'http://127.0.0.1:8000/api/projects/';
    
    // Status options mapping for the project status
    const statusOptions = [
        {value: 'new',label:'New'},
        {value: 'in_progress',label:'In Progress'},
        {value: 'completed',label:'Completed'},
        {value: 'cancelled',label:'Cancelled'}
    ];

    //Handle project editing
    const handleEdit = (project) => {
        console.log('Project will be edited');
        setProjectToEdit(project);
    }

    //Handle Project deletion
    const handleDelete = (id) => {
        axios.delete(`${API_URL}${id}/`)
         .then(response=>{
            console.log('Project was deleted', response);
            const updatedProjects = projects.filter(project => project.id !== id);
            setProjects(updatedProjects)
            
         })
         .catch(error=> {
            console.log('There was an error deleting this project',error);
         });

    }

    //Find the team name and status to show them in card
    const teamName = teams.find(team => team.id === project.team)?.name || 'No Team';
    const statusLabel = statusOptions.find(option=>option.value === project.status)?.label || 'Unknown Status';

    return (
        <div className="card">
            <h2>{project.title}</h2>
            <p>Description: {project.description}</p>
            <p>Started at: {project.start_date}</p>
            <p>Status: {statusLabel}</p>
            <p>Team: {teamName}</p>
            <button onClick={()=> handleEdit(project)}>Edit</button>
            <button onClick={()=>handleDelete(project.id)}>Delete</button>
        </div>
    )
}

export default ProjectCard;