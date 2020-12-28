import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Delete from "./Components/Delete";
import Edit from "./Components/Edit";
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";

export default function Routes() {
  return (
    <Router>
      <Route exact path="/" component={Login} />
      <Route path="/Register" component={Register} />
      <Route path="Home" component={Home} />
      <Route path="Edit/:id" component={Edit} />
      <Route path="Delete/:id" component={Delete} />
    </Router>
  );
}