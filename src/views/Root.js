import React from 'react'; 
import Layout from './Layout';
import Register from '../components/Register/Register';
import LogIn from '../components/LogIn/LogIn';
import CreateTask from '../components/CreateTask/CreateTask';
import EditTask from '../components/EditTask/EditTask';
import ListTasks from '../components/ListTasks/ListTasks'; 
import { Routes, Route,} from 'react-router-dom';




const Root = () => (
    <Routes>
        <Route path="/" element={<Layout/>}> 
            <Route path = "/"  element={<LogIn/>}/>
            <Route path = "Register" element={<Register/>}/>

            <Route path= "ListTasks"  element={<ListTasks/>}/>   
            <Route path = "CreateTask"  element={<CreateTask/>}/>
            <Route path= "/EditTask/:id"  element={<EditTask/>}/>
                   
        </Route>
    </Routes>
   
);

export default Root; 





