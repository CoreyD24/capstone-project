import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom"; use later when clicking on product to take to single product page

const Login = () => {
  const [userToken, setUserToken] = useState("");

  useEffect(() => {
    async function getAuth() {
      try {
        const { data: token } = await axios.get("/auth/login");
        setUserToken(token);
      } catch (error) {
        console.error(error);
      }
    }
    getAuth();
  }, []);

  return (
    <div>
      <h2> Login </h2>
    </div>
  );
};

export default Login;
