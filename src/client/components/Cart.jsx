import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/cart.css";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data: cartProducts } = await axios.get("/api/cart", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        });
        // Here we are setting the state of products to have the product info,
        // plus the requested amount from the back end
        setProducts(cartProducts.result);
      } catch (error) {
        console.error(error);
      }
    };
    getCart();
  }, []);

  const incrementQuantity = async (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (
        updatedProducts[index].requested_quantity <
        updatedProducts[index].quantity
      ) {
        updatedProducts[index].requested_quantity += 1;
      }
      console.log(updatedProducts);
      return updatedProducts;
    });
  };
  const decrementQuantity = async (index) => {
    setProducts((prevProducts) => {
      const updatedProducts = [...prevProducts];
      if (updatedProducts[index].requested_quantity > 1) {
        updatedProducts[index].requested_quantity -= 1;
      }
      return updatedProducts;
    });
  };

  return (
    <div>
      {products.length > 0 ? (
        <div>
          <h2> Your Cart Items </h2>
          <div id="cart_container">
            {/* We need the index in this map in order to choose which product quantity we're going to edit */}
            {products.map((product, index) => {
              return (
                <div className="cart_product" key={product.id}>
                  <Link to={`/products/${product.id}`}>
                    <img src={product.img} />
                  </Link>
                  <div>
                    <h3> Brand: {product.brand} </h3>
                    <h3> Price: {product.price} </h3>
                    <p>Quantity: {product.requested_quantity}</p>

                    <div className="quantity_adjuster">
                      <button onClick={() => decrementQuantity(index)}>
                        -
                      </button>
                      <input
                        type="text"
                        min="1"
                        max={product.quantity}
                        value={product.requested_quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                      <button onClick={() => incrementQuantity(index)}>
                        +
                      </button>
                      <button>UpdateCart</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p>Your cart is empty</p>
      )}
    </div>
  );
};

export default Cart;
