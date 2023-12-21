import React, { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom"; use later when clicking on product to take to single product page

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data: foundProducts } = await axios.get("/api/products");
        setProducts(foundProducts);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <div>
      <h2> All Products </h2>
      <div id="all_products_container">
        {products.map((product) => {
          return (
            <div key={product.id} style={{ border: "1px solid black" }}>
              <h3> Brand: {product.brand} </h3>
              <img src={product.img} />
              <h3> Price: {product.price} </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
