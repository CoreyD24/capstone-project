import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setIsAdmin, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async (e) => {
    e.preventDefault();
    const {
      data: { token, admin },
    } = await axios.post("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("Admin", admin || false)
    setToken(token);
    setIsAdmin(admin);
    navigate("/");
  };

  return (
    <section id="loginPage">
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
        <button onClick={loginHandler}>Login</button>
        <br />
        <Link to="/register">Create An Account!</Link>
      </form>
    </section>
  );
};

export default Login;
