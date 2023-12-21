import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import AllProducts from "./components/AllProducts";
import SingleProduct from "./components/SingleProduct";

const App = () => {

  return (
    <div className="App">
     <Routes>
      <Route path="/products" element={<AllProducts />}/>
      <Route path="/:id" element={<SingleProduct />}/>
      </Routes>
    </div>
  );
}

export default App;
