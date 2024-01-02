import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Register = ({ setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [first_name, setFirst_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [phone_number, setPhone_number] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const {
      data: { token, admin },
    } = await axios.post("/auth/register", {
      username,
      password,
      email,
      address,
      first_name,
      last_name,
      phone_number,
    });
    localStorage.setItem("TOKEN", token);
    setToken(token);
    navigate("/");
  };

  return (
    <div>
      <h2> Login </h2>

      <form action="">
        <label htmlFor="">
          Username:
          <br />
          <input
            placeholder="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Password:
          <br />
          <input
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          email:
          <br />
          <input
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          address:
          <br />
          <input
            placeholder="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          First Name:
          <br />
          <input
            placeholder="First Name"
            value={first_name}
            onChange={(e) => setFirst_name(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Last Name:
          <br />
          <input
            placeholder="Last Name"
            value={last_name}
            onChange={(e) => setLast_name(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Phone Number:
          <br />
          <input
            placeholder="Phone Number"
            value={phone_number}
            onChange={(e) => setPhone_number(e.target.value)}
          />
        </label>
        <br />
        <button onClick={loginHandler}>Register</button>
      </form>
    </div>
  );
};

export default Register;
