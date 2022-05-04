import React, { useState } from "react";
import { constants } from "../config/config";
import { ReactComponent as Logo } from "../images/StackoverflowLogo.svg";
import "../styles/login.css";
import axios from "axios";

function SignUp() {
  /* -------------------------------- variables ------------------------------- */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const signUpURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/user/signup`;

  /* ------------------------------ handle submit ----------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };

    axios
      .post(signUpURL, data)
      .then((response) => {
        console.log(response);
        if (response.status == 201) {
          setMessage("");
          console.log("done");
          const token = response.data.token;
          window.localStorage.setItem("token", token);
        }
      })
      .catch((error) => {
        console.log("there was an error in the Signup.js handlesubmit");
        setMessage(error.response.data.message);
      });
  };

  /* ------------------------------- return jsx ------------------------------- */
  return (
    <div className="body">
      <div className="flexbox-container">
        <div className="login-container">
          <Logo />
          <form className="form-controller">
            <div className="form-input-container">
              <label id="Name" className="form-input-label">
                Name
                <div className="form-input-input-container">
                  <input
                    className="form-input-input"
                    htmlFor="name"
                    type="text"
                    name="name"
                    autoComplete="off"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                  />
                </div>
              </label>
            </div>
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
              Sign up
            </button>
          </form>
          <p className="sign-up-link">
            Don’t have an account? <a>Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
