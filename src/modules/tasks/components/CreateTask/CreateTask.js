import React,{useState} from 'react'; 
import CreateTaskCSS from './CreateTask.module.css'
import {Link, useNavigate } from "react-router-dom";
import todosApi from '../../../../core/api/todoApi.js';


const TASK_URL = '/task'


const CreateTask = () => {
    const navigate = useNavigate(); 
    const [value, setValue] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{

            const response = await todosApi.post(TASK_URL,
                {"name" : value},
                { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
                );
                console.log(JSON.stringify(response));
                navigate("/ListTasks");
            } catch(error)  {
                
                if (error.addTodo) {
                     console.log(error.response.data);
                     console.log(error.response.status);
                 
                } else if (error.request) {
                    console.log(error.request);
                } else {
                    console.log('Error', error.message);
                }
                console.log(error.config);
              };
            }
    
    return (
        <section  className={CreateTaskCSS.section}>
            <label className={CreateTaskCSS.label}>Name </label>
                
            <input className={CreateTaskCSS.input}
                onChange={(e) => setValue(e.target.value)}
                value={value}
                type="text"
                id="name"
                autoComplete="off"
                required/>
            <button onClick={handleSubmit}>Save</button>
            <button ><Link to="/ListTasks">Cancel</Link></button>
        </section>
    )
    }
    


export default CreateTask