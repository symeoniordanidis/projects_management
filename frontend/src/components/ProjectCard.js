import React from 'react';
import axios from 'axios';

function ProjectCard({project}){

    const API_URL = 'http://127.0.0.1:8000/api/projects/';

    const handleEdit = (project) => {
        console.log('Project will be edited');
    }

    const handleDelete = (id) => {
        axios.delete(`${API_URL}${id}`)
         .then(response=>{
            console.log('Project was deleted', response);
         })
         .catch(error=> {
            console.log('There was an error deleting this project',error);
         });

    }

    return (
        <div className="card">
            <h2>{project.title}</h2>
            <p>Description: {project.description}</p>
            <p>Started at: {project.start_date}</p>
            <p>Status: {project.status}</p>
            <p>Team: {project.team}</p>
            <button onClick={()=> handleEdit(project)}>Edit</button>
            <button onClick={()=>handleDelete(project.id)}>Delete</button>
        </div>
    )
}

export default ProjectCard;