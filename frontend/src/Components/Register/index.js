import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom"
import api from "../../Services/api"

import "./styles.css"

function Register() {
	const [email, setEmail] = useState()
	const [password, setPassword] = useState()
	const [name, setName] = useState()
	const [description, setDescription] = useState()
	let history = useHistory();

  function handleSubmit(event) {
		event.preventDefault();
		const data = {
			email,
			password,
			name,
			short_bio:description,
		}
		api.post("users/register", data).then(res => {
			history.push("/");
		})
  }

  return (
    <div className="register">
    <div className="register-container">
			<h1 className="register-title">Register</h1>
		<form className="register-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="name" className="field" onChange={event => setName(event.target.value)}/>
			<input type="text" placeholder="e-mail" className="field" onChange={event => setEmail(event.target.value)}/>
			<input type="password" placeholder="password" className="field" onChange={event => setPassword(event.target.value)}/>
      <input type="text" placeholder="short description" className="field" onChange={event => setDescription(event.target.value)}/>
			<input type="submit" value="Register" className="btn"/>
		</form>
		<div className="pass-link">
			<Link to="/" >Go back to login</Link>
		</div>	
	</div>
  </div>
  )
}

export default Register;