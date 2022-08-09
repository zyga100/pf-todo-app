import React, { useRef, useState, useEffect } from "react";
import {Link, useNavigate} from "react-router-dom";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import RegisterCSS from './Register.moduls.css'
import todosApi from '../../../../core/api/todoApi.js';


const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PWD_REGEX = /^[a-zA-Z0-9!@#$%^&*)(+=.]{6,30}$/;
const REGISTER_URL = '/user/sign-up';

const Register = () => {
    const emailRef = useRef();
    const errRef = useRef();
    const navigate = useNavigate(); 

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false); 
    const [emailFocus, setEmailFocus] = useState(false); 

    const [password, setPassword] = useState('');
    const [vaildPassword, setValidPassword] = useState(false); 
    const [passwordFocus, setPasswordFocus] = useState(false); 

    const [matchPass, setMatchPass] = useState('');
    const [validMatchPass, setvalidMatchPass] = useState(false); 
    const [matchPassFocus, setMatchPassFocus] = useState(false); 

    const [errMsg, setErrMsg] = useState('');

    useEffect (()=>{
        emailRef.current.focus();
    },[])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email);
        console.log(result);
        console.log(email);
        setValidEmail(result);
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPassword(result);
        const match = password === matchPass;
        setvalidMatchPass(match);
    }, [password, matchPass])

    useEffect (() => {
        setErrMsg('');
    },[email, password, matchPass])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try{
            const response = await todosApi.post(REGISTER_URL, 
                {"email" : email, "password" : password },
                {
                    
                });        
            console.log(response.data);
            console.log(JSON.stringify(response));
            navigate("/"); 
        } catch (err){
            if (err.response){
                setErrMsg('No server response');
            } 
            errRef.current.focus();
        }       
 }
    return (
        <section className={RegisterCSS.section}>
            <p  ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive" >{errMsg}</p>
            <form className={RegisterCSS.form}>
                <label htmlFor="email" className={RegisterCSS.label}>Email 
                <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
               
                <input className={RegisterCSS.input}
                    type="text"
                    id="email"
                    ref={emailRef}
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-invalid={validEmail ? "false":"true"}   /* <-for screen readers */ 
                    aria-describedby="eidnote"                   /* <-for screen readers */    
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                 <p id="eidnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                            This is not a valid email format!<br />     
                </p>

                <label htmlFor="password" className={RegisterCSS.label}>Password
                <FontAwesomeIcon icon={faCheck} className={vaildPassword ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={vaildPassword || !password ? "hide" : "invalid"} />   
                </label>
                <input className={RegisterCSS.input}
                    type="password"
                    id="password"  
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-invalid={vaildPassword ? "false":"true"}   /* <-for screen readers */ 
                    aria-describedby="pasidnote"                   /* <-for screen readers */    
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                 <p id="pasidnote" className={passwordFocus && !vaildPassword ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                            8 to 24 characters.<br />
                            Must include uppercase and lowercase letters, a number and a special character.<br />
                            Allowed special characters: <span aria-label="exclamation mark">!</span> 
                            <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> 
                            <span aria-label="dollar sign">$</span> 
                            <span aria-label="percent">%</span>
                </p>

                <label htmlFor="Confirm_password" className={RegisterCSS.label}>Confirm password
                <FontAwesomeIcon icon={faCheck} className={validMatchPass && matchPass ? "valid" : "hide"} />
                <FontAwesomeIcon icon={faTimes} className={validMatchPass || !matchPass ? "hide" : "invalid"} />
                </label>
                <input className={RegisterCSS.input}
                    type="password"
                    id="matchPass"  
                    onChange={(e) => setMatchPass(e.target.value)}
                    required
                    aria-invalid={validMatchPass ? "false":"true"}   /* <-for screen readers */ 
                    aria-describedby="conpassidnote"                   /* <-for screen readers */    
                    onFocus={() => setMatchPassFocus(true)}
                    onBlur={() => setMatchPassFocus(false)}
                />
                 <p id="conpassidnote" className={matchPassFocus && matchPass && !validMatchPass ? "instructions" : "offscreen"}>
                 <FontAwesomeIcon icon={faInfoCircle} />
                            Must match the first password input field.
                </p>

                <button onClick={handleSubmit} disabled={!validEmail || !vaildPassword || !validMatchPass ? true : false} className={RegisterCSS.button}>Register</button>
                <button className={RegisterCSS.button}> <Link to="/"> Log in </Link> </button>
            </form>
        </section>
        )
}
     
    


export default Register 