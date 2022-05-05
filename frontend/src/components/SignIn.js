import React, { useState } from "react";
import { constants } from "../config/config";
import { ReactComponent as Logo } from "../images/StackoverflowLogo.svg";
import "../styles/login.css";
import axios from "axios";
import Navbar from "./user/Navbar";
import { Link, useNavigate } from "react-router-dom";
import User from "../pages/user";

function SignIn() {
  /* -------------------------------- variables ------------------------------- */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const signInURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/user/signin`;
  const navigate = useNavigate();

  /* ------------------------------ handle submit ----------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    axios
      .post(signInURL, data)
      .then((response) => {
        if (response.status == 200) {
          setMessage("");
          const token = response.data.token;
          const user = response.data;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("user", user);
          console.log("signed in"); // will be replaced by navigating to a new page
          if (user.admin) {
            navigate("/admin", { replace: true });
          } else {
            navigate("/question", { replace: true });
          }
        }
      })
      .catch((error) => {
        console.log("there was an error in the Signin.js handlesubmit");
        console.log(error.response.data);
        setMessage(error.response.data.message);
      });
  };

  /* ------------------------------- return jsx ------------------------------- */
  return (
    <div className="body">
      {/* <Navbar /> */}
      <div className="flexbox-container">
        <div className="login-container">
          <Logo />
          <form className="form-controller">
            <div className="form-input-container">
              <label id="Email" className="form-input-label">
                Email
                <div className="form-input-input-container">
                  <input
                    className="form-input-input"
                    htmlFor="email"
                    type="text"
                    name="email"
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    value={email}
                  />
                </div>
              </label>
            </div>
            <div className="form-input-container">
              <label id="Password" className="form-input-label">
                Password
                <div className="form-input-input-container">
                  <input
                    className="form-input-input"
                    htmlFor="Password"
                    type="password"
                    name="password"
                    autoComplete="off"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    value={password}
                  />
                </div>
              </label>
            </div>
            <p className="error-message">{message}</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="log-in-button"
            >
              Sign in
            </button>
          </form>
          <p className="sign-up-link">
            Don’t have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
