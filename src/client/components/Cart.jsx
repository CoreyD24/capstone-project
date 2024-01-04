import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState([]);

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data: cartProducts } = await axios.get("/api/cart", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        });
        setProducts(cartProducts.result);
      } catch (error) {
        console.error(error);
      }
    };
    getCart();
  }, []);

  return (
    <div>
      {products ? (
        <div>
          <h2> Your Cart Items </h2>
          <div id="cart_container">
            {products.map((product) => {
              console.log(product);
              return (
                <div className="cart_product">
                  <Link
                    to={`/products/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <img src={product.img} />
                  </Link>
                  <div key={product.id}>
                    <h3> Brand: {product.brand} </h3>
                    <h3> Price: {product.price} </h3>
                  </div>
                  <div className="quantity_adjuster">
                    <button>-</button>
                    <input type="text" />
                    <button>+</button>
                    <p>Quantity: {product.requested_quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Cart;
