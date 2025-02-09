import React, { useState } from "react";
import "./css/registration.css";
import { Link } from "react-router-dom";
import gb from "./image/moon.jpg";
import axios from "axios";

const Registration = () => {
  const [Register, setRegister] = useState({
    Username: "",
    Password: "",
  });
  const [Error, setError] = useState({});
  const handleRegister = (e) => {
    if (handleValidation()) {
      axios
        .post("http://localhost:8081/Auth/Register", Register)
        .then((res) =>
          console.log({
            message: "Successfuly to Sent data to the backend ",
            res,
          })
        )
        .catch((err) => console.error({ message: "Server Error ", err }));
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegister({ ...Register, [name]: value });
  };

  const handleValidation = () => {
    const Validate = {};
    if (!Register.Username.trim()) {
      Validate.Username = "Please Enter  the Username";
    }
    if (!Register.Password.trim()) {
      Validate.Password = "Please Enter Password";
    }
    if (Register.Password.trim().length < 6) {
      Validate.Password = "Please Enter Password with atleast 6 character";
    }
    setError(Validate);
    return Object.keys(Validate).length === 0;
  };

  return (
    <div
      style={{
        background: `url(${gb})`,
        backgroundSize: "cover",
        height: "100vh",
        opacity: "79%",
      }}
    >
      <div className="box1">
        <form onSubmit={handleRegister} className="form1">
          <div className="label">
            <h2 className="logor">Register</h2>
            <div>
              <label htmlFor="Rusername">Username</label>
              <input
                type="text"
                name="Username"
                id="Rusername"
                onChange={handleChange}
                value={Register.Username}
                required
              />
              {Error.Username && <p>{Error.Username}</p>}
            </div>

            <div>
              <label htmlFor="Rpasswrd">Password</label>
              <input
                type="password"
                name="Password"
                id="Rpasswrd"
                onChange={handleChange}
                value={Register.Password}
                required
              />
              {Error.Password && <p>{Error.Password}</p>}
            </div>

            <div>
              <button className="register1">Register</button>
            </div>
            <div>
              <h5 className="account">
                <Link To="/Login">already have an account</Link>
              </h5>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
