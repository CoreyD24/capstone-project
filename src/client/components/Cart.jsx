import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Cart = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
      const getCart = async() => {
        try {
          const { data: cartProducts} = await axios.get("/api/cart", {
            headers: {
              Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
            },
          });
          console.log(cartProducts.result)
          setProducts(cartProducts.result);
          console.log("cart products", products)
        } catch (error) {
          console.error(error);
        }
      }
      getCart();
    }, []);
  
    return (
      <div>
        <h2> Your Cart Items </h2>
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

export default Cart;