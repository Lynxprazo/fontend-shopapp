import React, { useState } from "react";
import "./css/Login.css";
import NEW from "./NEW";
import ggg from "./image/young.jpg";
import axios from "axios";

const Login = () => {
  const [Error, setError] = useState({});
  const [Formstate, setFormstate] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormstate({ ...Formstate, [name]: value });
  };

  const ValidateLogin = () => {
    const validateError = {};
    if (!Formstate.username) {
      validateError.username = "Please Enter Username";
    }
    if (!Formstate.password) {
      validateError.password = "Please Enter Password";
    }
    setError(validateError);
    return Object.keys(validateError).length === 0;
  };

  // Modify the handlerSubmit to send data to the backend
  const handlerSubmit = (e) => {
    e.preventDefault();
    if (ValidateLogin()) {
      axios
        .post("http://localhost:8081/Auth/Login", Formstate)
        .then((res) => {
          console.log("login successfuly", res);
        })
        .catch((err) => {
          console.error("There  is error in ", err);
        });

      // Reset form fields after submission
      setFormstate({
        username: "",
        password: "",
      });
    }
  };

  return (
    <div
      className="body"
      style={{
        background: `url(${ggg})`,
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <NEW />
      <div className="box">
        <div className="title1">
          <div><span className="LoginForm-Ti">Login Please</span></div>
        </div>
        <form className="Form" autoComplete="off" onSubmit={handlerSubmit}>
          <div className="Input-box">
            <input
              type="text"
              name="username"
              onChange={handleChange}
              value={Formstate.username}
              required
            />
            <label htmlFor="username">Username</label>
            {Error.username && <p>{Error.username}</p>}
          </div>

          <div className="Input-box">
            <input
              type="password"
              name="password"
              onChange={handleChange}
              value={Formstate.password}
              required
            />
            <label htmlFor="password">Password</label>
            {Error.password && <p>{Error.password}</p>}
          </div>
          <button type="submit" className="button">
            Sign in
          </button>
          <a href="Register" className="link">
          <div><span className="LoginForm-Tir">Register here</span></div>
          </a>
        </form>
      </div>
    </div>
  );
};

export default Login;
