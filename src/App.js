import React from "react";
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
  return (
    <Router>
      <>
        <Switch>
          <Route exact path="/">
            <SignUp handleForm={formValidity} />
          </Route>
          <PrivateRoute exact path="/dashboard">
            <Dashboard />
          </PrivateRoute>
        </Switch>
      </>
    </Router>
  );
}

// A wrapper for Dashboard <Route> that redirects to the signup page if not yet validated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        formValidity.isValid ? (
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
