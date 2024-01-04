import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AllProducts = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProducts() {
      try {
        const { data: foundProducts } = await axios.get("/api/products");
        setProducts(foundProducts);
        console.log(foundProducts);
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
            <Link
              to={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                key={product.id}
                style={{ border: "2px solid black", marginBottom: "5px" }}
              >
                <h3> Brand: {product.brand} </h3>
                <img src={product.img} />
                <h3> Price: {product.price} </h3>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
