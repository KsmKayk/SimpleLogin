import React, {useState} from 'react';
import {Link, useHistory} from "react-router-dom"
import api from "../../Services/api"

import "./styles.css"

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
};

function Edit() {
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
		api.put(`users/edit/${localStorage.getItem("user_id")}`, data, config).then(res => {
			history.push("/home");
		})
  }

  return <div className="edit">
  <div className="edit-container">
    <h1 className="edit-title">Edit</h1>
  <form className="edit-form" onSubmit={handleSubmit}>
      <input type="text" placeholder="name" className="field" onChange={event => setName(event.target.value)}/>
			<input type="text" placeholder="e-mail" className="field" onChange={event => setEmail(event.target.value)}/>
			<input type="password" placeholder="password" className="field" onChange={event => setPassword(event.target.value)}/>
      <input type="text" placeholder="short description" className="field" onChange={event => setDescription(event.target.value)}/>
			<input type="submit" value="Edit" className="btn"/>
  </form>
  <div className="pass-link">
    <Link to="/home" >Go back to home</Link>
  </div>	
</div>
</div>
}

export default Edit;