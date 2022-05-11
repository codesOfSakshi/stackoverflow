import React, { useState, useEffect } from "react";
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
  const [validEmail, setValidEmail] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");

  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");

  const [message, setMessage] = useState("");
  const [buttonAbled, setButtonAbled] = useState(true);
  const EMAIL_REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
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
          const user = response.data.user;
          const userID = response.data.user._id;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("user", user);
          window.localStorage.setItem("userID", userID);
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

  /* -------------------- useEffect to validate the inputs -------------------- */

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
    if (validEmail) {
      setInvalidEmailMessage("");
    } else {
      setInvalidEmailMessage("Please use a valid email");
    }
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
    if (validPassword) {
      setInvalidPasswordMessage("");
    } else {
      setInvalidPasswordMessage("Please use a valid password");
    }
  }, [password]);

  /* ------------------ useEffect to allow/disallow a button ------------------ */

  useEffect(() => {
    if (validEmail && validPassword) {
      setButtonAbled(true);
    } else {
      setButtonAbled(false);
    }
  }, [validEmail, validPassword]);

  /* ------------------------------- return jsx ------------------------------- */
  return (
    <div className="body">
      <Navbar />
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
              <p className="error-message">{invalidEmailMessage}</p>
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
              <p className="error-message">{invalidPasswordMessage}</p>
            </div>
            <p className="error-message">{message}</p>
            <button
              type="submit"
              onClick={handleSubmit}
              className="log-in-button"
              disabled={!buttonAbled}
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
