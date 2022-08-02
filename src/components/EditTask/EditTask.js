import React , {useState, useEffect}  from 'react'; 
import EditTaskCSS from './EditTask.module.css'
import {Link, useParams, useNavigate } from "react-router-dom";
import todosApi from "../../Api/todoApi" 

const EditTask = () => {

    const {id} = useParams();
    const [task, setTask] = useState('{name:""}');
    const [newValue, setNewValue] = useState("");
    const navigate = useNavigate;
    console.log(id);
   
    useEffect(() => {
        const fetchTasks = async () => {
          try {
            const response = await todosApi.get(`/task/${id}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
            setNewValue(response.data.name);
            console.log(response.data.name);
            console.log(task);
            console.log(setTask);
          } catch (err) {
            if (err.response) {
              
              console.log(err.response.data);
              console.log(err.response.status);
              console.log(err.response.headers);
            } else {
              console.log(`Error: ${err.message}`);
            }
          }
        }
        fetchTasks();
      }, []);

      const handleChange = (e) => {
        setNewValue(e.target.value);
      }

      const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const response = await todosApi.put(`/task/${id}`,
                {"name" : newValue},
                { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}}
                );
                navigate("/ListTasks");
                console.log(JSON.stringify(response));
                
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
        <section  className={EditTaskCSS.section}>
            <label className={EditTaskCSS.label}>Name </label>
                
            <input className={EditTaskCSS.input}
                value={newValue}
                onChange={handleChange}
                id="name"
                required/>
            <button  onClick={handleUpdate} ><Link to="/ListTasks">Save</Link></button>
            <button ><Link to="/ListTasks">Cancel</Link></button>
        </section>
    )

}

export default EditTask;