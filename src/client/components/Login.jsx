import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = ({ setIsAdmin, setToken }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async (e) => {
    e.preventDefault();
    const {
      data: { token, admin },
    } = await axios.post("/auth/login", {
      username,
      password,
    });
    localStorage.setItem("TOKEN", token);
    localStorage.setItem("Admin", admin);
    setToken(window.localStorage.getItem("TOKEN") || null);
    setIsAdmin(window.localStorage.getItem("Admin") || null);
    navigate("/");
  };

  return (
    <section id="login_page">
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
            type= {showPassword ? "text" : "password"}
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button> Eye </button>
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
