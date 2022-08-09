import React, {useState, useEffect} from 'react'; 
import ListTasksCSS from "./ListTasks.module.css"
import {Link} from "react-router-dom";
import todosApi from '../../../../core/api/todoApi.js';



const TASK_URL = '/task' 
const ListTasks = () => {
  
    const [tasks, setTasks] = useState([]);
    
 useEffect(() => {
    
    const fetchTasks = async () => {
      try {
        const response = await todosApi.get(TASK_URL, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
        setTasks(response.data);
        console.log(response.data);
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
  }, [])

  const handleDelete = async (_id) => {
    try {
      await todosApi.delete(`/task/${_id}`, { headers: {Authorization: `Bearer ${localStorage.getItem("token")}`}});
      const list = tasks.filter(tasks => tasks._id !== _id);
      setTasks(list);
    } catch (err) {
      console.log(`Error: ${err.message}`);
      } 
  }

     return (
       <section className={ListTasksCSS.section}>
           <header className={ListTasksCSS.header}>
               <h1 className={ListTasksCSS.h1}>Task</h1>
               <button className={ListTasksCSS.button}><Link to="/CreateTask">Add</Link></button>
           </header>
                <h4 className={ListTasksCSS.h4}><p>Name</p><p>Actions</p></h4>
                {tasks.length > 0 &&
        tasks.map((el) => (
            <div className={ListTasksCSS.singelTask} key={el._id}>
                <p>{el.name}</p>
                <div className={ListTasksCSS.bottonHolder}>
                    <button className={ListTasksCSS.bntEdit} ><Link to={`/EditTask/${el._id}`}>Edit</Link></button>
                    <button className={ListTasksCSS.bntDelete} onClick={() => {handleDelete(el._id);}}>Delete</button>
                </div>
            </div>))}
       </section>
    )
     }
    

export default ListTasks


