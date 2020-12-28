import React, {useEffect, useState} from 'react';
import {Link, Redirect} from "react-router-dom"
import api from "../../Services/api"

import "./styles.css";

function Home() {
	const [name, setName] = useState()
	const [email, setEmail] = useState()
	const [description, setDescription] = useState()

	useEffect(() => {
		api.get(`users/${localStorage.getItem("user_id")}`).then(res => {
			setName(res.data.name)
			setEmail(res.data.email)
			setDescription(res.data.short_bio)
		})
	},[])

	function handleLogout() {
		localStorage.removeItem("token")
		localStorage.removeItem("user_id")
	}
  return (
		<div className="home">
		<div className="home-container">
			<h1 className="home-title">{name}</h1>
			<h3 className="home-email">{email}</h3>
			<h3 className="home-description">{description}</h3>
			<div className="pass-link">
				<Link to={`/edit/${localStorage.getItem("user_id")}`} >Go to Edit</Link>
			</div>
			<div className="pass-link">
				<Link to={`/delete/${localStorage.getItem("user_id")}`} >Go to Delete</Link>
			</div>	
			<div className="pass-link">
				<Link onClick={handleLogout} to="/">Logout</Link>
			</div>
		</div>
	</div>
  )
}

export default Home;