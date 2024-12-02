import React,{useState} from 'react';
import axios from 'axios';

function TeamForm(){
    
    const API_URL = 'http://127.0.0.1:8000/api/teams/';

    const [team,setTeam] = useState({
        name:'',
    });

    //handle input changes and update team data
    const handleChange = (e) => {
        setTeam({name:e.target.value})
    }

    //handle form submission for creating a new team
    const handleSubmit = (e) => {

        axios.post(`${API_URL}`,team)
            .then(response => {
                //reset team data
                setTeam({name:''})
            })
            .catch(error=>{
                console.error('An error occured while creating the team!',error);
            })
    }

    return (
      <div className="form-container">
         <h2> Teams </h2>
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Insert a Team Name"
                required>
            </input>
            <button type="submit">Create Team</button>
        </form>
      </div>  
    );
}

export default TeamForm;