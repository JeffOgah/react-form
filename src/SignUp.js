import React from "react";
import { useHistory } from "react-router-dom";
import useSignUp from "./UseSignUp";

const SignUp = ({handleForm: {formIsValid, setFormIsValid}}) => {
  const { inputs, handleInputChange } = useSignUp(setFormIsValid);
  const history = useHistory();

  const handleSubmit = event => {
    event.preventDefault();
    history.push("/dashboard");
  };
  
  return (
    <form onSubmit={handleSubmit} className="container">
      <h1>Signup Form</h1>
      <div className="form-row">
        <div className="col-12 mb-2 mb-md-3">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            className="form-control"
            id="fullName"
            onChange={handleInputChange}
            value={inputs.fullName}
          />
          <small className="text-muted">
            Must not be less that 2 characters, must include a space and second
            name
          </small>
          <span className="validity"></span>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          <small className="text-muted">
            Must include a valid email address
          </small>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="tel"
            className="form-control"
            id="phoneNumber"
            maxLength="11"
            onChange={handleInputChange}
            value={inputs.phoneNumber}
          />
          <small className="text-muted">
            Must be a valid Nigerian phone number without +234
          </small>
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <small className="text-muted">
            Must contain 6 or more characters with one number, uppercase and
            special character
          </small>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            onChange={handleInputChange}
            value={inputs.confirmPassword}
          />
          <small className="text-muted">Must match password field</small>
        </div>
      </div>
      <div className="form-row">
        <div className="col-12 mb-2 mb-md-3">
          <label htmlFor="cardNumber">Credit/Debit Card Number</label>
          <input
            type="text"
            className="form-control"
            id="cardNumber"
            maxLength="19"
            onChange={handleInputChange}
            value={inputs.cardNumber}
          />
          <small className="text-muted">
            Must match ‘XXXX XXXX XXXX XXXX’ format.
          </small>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="expirationDate">Expiration Date</label>
          <input
            type="text"
            className="form-control"
            id="expirationDate"
            maxLength="5"
            onChange={handleInputChange}
            value={inputs.expirationDate}
          />
          <small className="text-muted">Must match MM/YY format</small>
        </div>
        <div className="col-12 col-md-6 mb-2 mb-md-3">
          <label htmlFor="pin">PIN</label>
          <input
            type="password"
            className="form-control"
            id="pin"
            maxLength="4"
            onChange={handleInputChange}
            value={inputs.pin}
          />
          <small className="text-muted">
            Must be 4 characters and contain only numbers
          </small>
        </div>
      </div>
      <button type="submit" className="btn btn-primary" disabled={!formIsValid}>
        Submit
      </button>
    </form>
  );
};

export default SignUp;
