import React, {useState} from "react";
import {Link,useNavigate} from "react-router-dom";
import todosApi from '../../../../core/api/todoApi.js';
import "./LogIn.css";



const LOGIN_URL = "/user/log-in";

const LogIn = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const response = await todosApi.post (LOGIN_URL,
            {"email" : email, "password" : password },
            {
                headers: { 'Content-Type': 'application/json' },
                
            }
            );
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("refToken", refreshToken);

        console.log("token");
        console.log("refToken");
        console.log(accessToken);
        console.log(refreshToken );
        console.log(email, password);
        console.log(JSON.stringify(response)); 
        navigate("/ListTasks");    
        setEmail('');
        setPassword('');
        
    } catch(error)  {
        
        if (error.response) {
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
        <section>
          <form >
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button onClick={handleSubmit}>Sign In</button>
            <button> <Link to="/register"> Register</Link></button>
          </form>
        </section>  
  );
};

export default LogIn;
