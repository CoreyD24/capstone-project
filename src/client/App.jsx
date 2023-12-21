import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllProducts from "./components/AllProducts";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProducts />} />
      </Routes>
    </div>
  );
};

export default App;
