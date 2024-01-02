import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";
import Navbar from "./components/Navbar.jsx";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} setToken={setToken} />}
        />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/products" element={<AllProducts isAdmin={isAdmin} />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
      <p>navbar</p>
    </div>
  );
};

export default App;
