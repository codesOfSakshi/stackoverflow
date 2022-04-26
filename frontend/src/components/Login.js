import React from "react";
import { ReactComponent as Logo } from "../images/StackoverflowLogo.svg";
import "../styles/login.css";

function Login() {
  return (
    <div className="body">
      <div className="flexbox-container">
        <div className="login-container">
          <Logo />
          <form className="form-controller">
            <div className="form-input-container">
              <label id="Username" className="form-input-label">
                Username
                <div className="form-input-input-container">
                  <input
                    className="form-input-input"
                    for="Username"
                    type="text"
                    name="username"
                    autocomplete="off"
                    value=""
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
                    for="Password"
                    type="password"
                    name="password"
                    autocomplete="off"
                    value=""
                  />
                </div>
              </label>
            </div>
            {/* <p className="login-form_status__173pi"></p> */}
            <button type="submit" className="log-in-button">
              Log in
            </button>
          </form>
          <p className="sign-up-link">
            Don’t have an account? <a>Sign up</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
