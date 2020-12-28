import React from "react";
import {isAuthenticated} from "./Services/auth";
import { BrowserRouter as Router, Route,Switch,Redirect } from "react-router-dom";

import Delete   from "./Components/Delete";
import Edit     from "./Components/Edit";
import Home     from "./Components/Home";
import Login    from "./Components/Login";
import Register from "./Components/Register";

const PrivateRoute = ({component: Component, ...rest}) => (
  <Route {...rest} render={props => ( 
    isAuthenticated() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{pathname: "/", state: {from: props.location} }}/>
    )
  )}/>
)


export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/"           component={Login} />
        <Route exact path="/register"   component={Register} />
        <PrivateRoute exact path="/home"   component={Home} />
        <PrivateRoute exact path="/edit/:id"   component={Edit} />
        <PrivateRoute exact path="/delete/:id"   component={Delete} />
      </Switch>
    </Router>
  );
}