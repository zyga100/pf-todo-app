import React from 'react'; 
import Layout from './views/Layout.js';
import Register from './modules/auth/components/Register/Register.js';
import LogIn from './modules/auth/components/LogIn/LogIn.js';
import CreateTask from './modules/tasks/components/CreateTask/CreateTask.js';
import EditTask from './modules/tasks/components/EditTask/EditTask.js';
import ListTasks from './modules/tasks/components/ListTasks/ListTasks.js'; 
import { Routes, Route,} from 'react-router-dom';




const App = () => (
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

export default App; 





