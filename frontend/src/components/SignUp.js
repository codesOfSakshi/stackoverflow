import React, { useState, useEffect } from "react";
import { constants } from "../config/config";
import { ReactComponent as Logo } from "../images/StackoverflowLogo.svg";
import "../styles/login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  /* -------------------------------- variables ------------------------------- */
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [validName, setValidName] = useState(true);
  const [invalidNameMessage, setInvalidNameMessage] = useState("");
  const [validEmail, setValidEmail] = useState(true);
  const [invalidEmailMessage, setInvalidEmailMessage] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [invalidPasswordMessage, setInvalidPasswordMessage] = useState("");
  const [buttonAbled, setButtonAbled] = useState(true);
  const signUpURL = `http://${constants.IP.ipAddress}:${constants.IP.port}/api/user/signup`;
  const navigate = useNavigate();
  const USER_REGEX = /^[A-z][A-z0-9-_ ]{3,23}$/;
  const EMAIL_REGEX = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/;
  // const PWD_REGEX = /^(?=.[a-z])(?=.[A-Z])(?=.[0-9])(?=.[!@#$%]).{8,24}$/;
  const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

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
          const user = response.data;
          const userID = response.data.user._id;
          window.localStorage.setItem("token", token);
          window.localStorage.setItem("user", user);
          window.localStorage.setItem("userID", userID);
          navigate("/question", { replace: true });
        }
      })
      .catch((error) => {
        console.log("there was an error in the Signup.js handlesubmit");
        console.log(error.response.data);
        setMessage(error.response.data.message);
      });
  };

  /* -------------------- useEffect to validate the inputs -------------------- */

  useEffect(() => {
    setValidName(USER_REGEX.test(name));
    if (validName) {
      setInvalidNameMessage("");
    } else {
      setInvalidNameMessage("Please use valid characters");
    }
  }, [name]);

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
    if (validName && validEmail && validPassword) {
      setButtonAbled(true);
    } else {
      setButtonAbled(false);
    }
  }, [validName, validEmail, validPassword]);

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
              <p className="error-message">{invalidNameMessage}</p>
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
              Sign up
            </button>
          </form>
          <p className="sign-up-link">
            Don’t have an account? <Link to="/signin">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
