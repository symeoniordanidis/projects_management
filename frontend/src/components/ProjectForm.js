import React,{useState,useEffect} from 'react';
import axios from 'axios';

function ProjectForm({teams,projectToEdit,setProjectToEdit,setProjects,projects}) {
    const API_URL = 'http://127.0.0.1:8000/api/projects/';
    const [formData,setFormData] = useState ({
        title:'',
        description:'',
        start_date:'',
        status:'',
        team:''
    });

    useEffect(()=>{
        if(projectToEdit) {
            setFormData({
                title: projectToEdit.title,
                description: projectToEdit.description,
                start_date: projectToEdit.start_date,
                status: projectToEdit.status,
                team: projectToEdit.team
            });
        }
    }, [projectToEdit]);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(projectToEdit){
            axios.put(`${API_URL}${projectToEdit.id}/`,formData)
            .then(response =>{
                const updatedProjects = projects.map(project => 
                    project.id === projectToEdit.id ? response.data :project
                );
                setProjects(updatedProjects);
                setProjectToEdit(null);
                setFormData({
                    title:'',
                    description:'',
                    start_date:'',
                    status:'',
                    team:''
                });
            })
            .catch(error=>{
               console.error('There was an error while editing the project!',error);
            });
        } else {
            axios.post(`${API_URL}`,formData)
            .then(response =>{
                console.log(response);
                setProjects([...projects,response.data]);
                setFormData({
                    title:'',
                    description:'',
                    start_date:'',
                    status:'',
                    team:''
                });
            })
            .catch(error=>{
               console.error('There was an error while creating the projects!',error);
            });
        }

    }

    return (
        <div className="form-container">
            <h2>Project</h2>
            <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="title"
                  onChange={handleChange}
                  placeholder="Title"
                  value={formData.title}
                  required  
                />
                <input
                  type="text"
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  value={formData.description}
                  required  
                />
                <input
                  type="date"
                  name="start_date"
                  onChange={handleChange}
                  placeholder="Start Date"
                  value={formData.start_date}
                  required  
                />
                <select id="status" name="status" onChange={handleChange} value={formData.status} required>
                    <option key="new" value="new">New</option>
                    <option key="in_progress" value="in_progress">In Progress</option>
                    <option key="completed" value="completed">Completed</option>
                    <option key="cancelled" value="cancelled">Cancelled</option>
                </select>
                <select id="team" name="team" value={formData.team} onChange={handleChange}>
                    <option value="">Select a team</option>
                    {teams.map((team)=> (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
                <button type="submit">{projectToEdit ? 'Update': 'Create'}</button>

            </form>
        </div>
    )
}

export default ProjectForm;