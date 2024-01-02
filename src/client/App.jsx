import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Navbar from "./components/Navbar.jsx";
import AllUsers from "./components/AllUsers.jsx";
import Account from "./components/Account.jsx";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(
    window.localStorage.getItem("Admin") || null
  );
  const [token, setToken] = useState(
    window.localStorage.getItem("TOKEN") || null
  );

  return (
    <div className="App">
      <Navbar token={token} isAdmin={isAdmin} />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} setToken={setToken} />}
        />
        <Route
          path="/account"
          element={<Account setToken={setToken} setIsAdmin={setIsAdmin} />}
        />
        <Route path="/users" element={<AllUsers isAdmin={isAdmin} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/products" element={<AllProducts isAdmin={isAdmin} />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default App;
