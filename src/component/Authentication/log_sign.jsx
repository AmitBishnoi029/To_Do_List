import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/auth.css";
import { login, signup, isAuthenticated } from "./authfunctions"; // Import the authFunctions

const LogSign = ({isLogged,checkAuth}) => {
  const navigate = useNavigate();
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const handleCheckboxClick = () => {
    setIsCheckboxChecked(!isCheckboxChecked);
  };

  const handleLogin = async () => {
    // Implement login using authFunctions
    var email=document.getElementById('logEmail').value;
    var password=document.getElementById('logPass').value;
    const loggedIn = await login(email,password); // Replace with your actual login logic
    if (loggedIn) {
      // If login is successful, navigate to the dashboard
      checkAuth();
      navigate("/");
    } else {
      // Handle login failure, display an error message, etc.
      console.log("Login failed");
    }
  };

  const handleSignup = async () => {
    // Implement signup using authFunctions
    var email=document.getElementById('signEmail').value;
    var name=document.getElementById('signName').value;
    var password=document.getElementById('signPass').value;
    const signedUp = await signup(name,email,password); 
    
    if (signedUp) {
      // If signup is successful, navigate to the dashboard
      checkAuth();
      navigate("/");
    } else {
      // Handle signup failure, display an error message, etc.
      console.log("Signup failed");
    }
  };



  return (
    <div>
      {/* This is the auth page. Please log in or sign up to access this content! */}
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css"
        integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4"
        crossOrigin="anonymous"
      />

      <div className="section">
        <div className="container">
          <div className="row full-height justify-content-center">
            <div className="col-12 text-center align-self-center py-5">
              <div className="section pb-5 pt-5 pt-sm-2 text-center">
                <h6 className="mb-0 pb-3">
                  <span>Log In </span>
                  <span>Sign Up</span>
                </h6>
                <input
                  className="checkbox"
                  type="checkbox"
                  id="reg-log"
                  name="reg-log"
                  checked={isCheckboxChecked} // Bind the checkbox to the state
                  onChange={handleCheckboxClick}
                />
                <label htmlFor="reg-log"></label>
                <div className="card-3d-wrap mx-auto">
                  <div className="card-3d-wrapper">
                    <div className="card-front">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Log In</h4>
                          <div className="form-group">
                            <input
                              type="email"
                              name="logEmail"
                              className="form-style"
                              placeholder="Your Email"
                              id="logEmail"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="logPass"
                              className="form-style"
                              placeholder="Your Password"
                              id="logPass"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button onClick={handleLogin} className="btn mt-4">
                            Log In
                          </button>
                          <p className="mb-0 mt-4 text-center">
                            <a href="#0" className="link">
                              Forgot your password?
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="card-back">
                      <div className="center-wrap">
                        <div className="section text-center">
                          <h4 className="mb-4 pb-3">Sign Up</h4>
                          <div className="form-group">
                            <input
                              type="text"
                              name="signName"
                              className="form-style"
                              placeholder="Your Full Name"
                              id="signName"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-user"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="email"
                              name="signEmail"
                              className="form-style"
                              placeholder="Your Email"
                              id="signEmail"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-at"></i>
                          </div>
                          <div className="form-group mt-2">
                            <input
                              type="password"
                              name="signPass"
                              className="form-style"
                              placeholder="Your Password"
                              id="signPass"
                              autoComplete="off"
                            />
                            <i className="input-icon uil uil-lock-alt"></i>
                          </div>
                          <button onClick={handleSignup} className="btn mt-4">
                            Sign Up
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogSign;
