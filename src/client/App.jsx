import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Login.jsx";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";

const App = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(window.localStorage.getItem("TOKEN"));

  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={<Login setIsAdmin={setIsAdmin} setToken={setToken} />}
        />
        <Route path="/products" element={<AllProducts isAdmin={isAdmin} />} />
        <Route path="/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
};

export default App;
