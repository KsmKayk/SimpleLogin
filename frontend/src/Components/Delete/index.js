import React from 'react';
import {Link,useHistory} from "react-router-dom"
import api from "../../Services/api"


import "./styles.css"

const config = {
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
};

function Delete() {
  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    api.delete(`users/delete/${localStorage.getItem("user_id")}`, config).then(res => {
			history.push("/");
		})
  }

  return <div className="delete">
  <div className="delete-container">
    <h1 className="delete-title">Delete</h1>
    <form className="delete-form" onSubmit={handleSubmit}>
      <input type="submit" value="Delete this user" className="btn"/>
    </form>
  <div className="pass-link">
      <Link to="/" >Go to login</Link>
  </div>	
  </div>
</div>
}

export default Delete;