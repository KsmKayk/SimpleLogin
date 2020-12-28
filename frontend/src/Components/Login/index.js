import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom"
import api from "../../Services/api"

import "./styles.css";



function Login() {
  
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    const data = {
      email: email,
      password: password,
    }
    api.post("users/login", data).then(res => {
      localStorage.setItem("token",res.data.token)
      localStorage.setItem("user_id", res.data.user_id)
      history.push("/home");
      
		})
  }

  
  return (
    <div className="login">
      <div className="login-container">
			  <h1 className="login-title">Login</h1>
		    <form className="login-form" onSubmit={handleSubmit}>
		  	  <input type="text" placeholder="e-mail" className="field" onChange={event => setEmail(event.target.value)}/>
			  <input type="password" placeholder="password" className="field" onChange={event => setPassword(event.target.value)}/>
			  <input type="submit" value="login" className="btn"/>
		  </form>
		  <div className="pass-link">
			    <Link to="/Register" >Go to register</Link>
		  </div>	
	    </div>
      
    </div>
  )
}

export default Login;