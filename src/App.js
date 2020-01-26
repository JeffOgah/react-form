import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import SignUp from "./SignUp";
import Dashboard from "./Dashboard";



const formValidity = {
  isValid: false,
  setIsValid(value) {
    formValidity.isValid = value;
  }
};

export default function App() {
  const [formIsValid, setFormIsValid] = useState(false)

  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <SignUp handleForm={{formIsValid, setFormIsValid}} />
          </Route>
          <PrivateRoute exact path="/dashboard" validated={formIsValid}>
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
}

// A wrapper for Dashboard <Route> that redirects to the signup page if not yet validated.
function PrivateRoute({ children, validated, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        validated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}
