import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/cart.css";

const Cart = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [localQuantities, setLocalQuantities] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(false);

  useEffect(() => {
    const getCart = async () => {
      try {
        const { data: cartProducts } = await axios.get("/api/cart", {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        });

        //ensure that localQuantities has the same length as products
        const initialQuantities = cartProducts.cartProducts || [];

        // Here we are setting the state of products to have the product info,
        // plus the requested amount from the back end
        setLocalQuantities(initialQuantities);
        setProducts(cartProducts.result);
      } catch (error) {
        console.error(error);
      }
    };
    getCart();
  }, [refreshTrigger]);

  const decrementQuantity = async (index, inStock) => {
    setLocalQuantities((prevProducts) => {
      const updatedQuantities = [...prevProducts];

      if (updatedQuantities[index].product_quantity > 1) {
        updatedQuantities[index].product_quantity -= 1;
      }
      return updatedQuantities;
    });
  };

  const incrementQuantity = async (index, inStock) => {
    setLocalQuantities((prevProducts) => {
      const updatedQuantities = [...prevProducts];

      if (updatedQuantities[index].product_quantity < inStock) {
        updatedQuantities[index].product_quantity += 1;
      }
      return updatedQuantities;
    });
  };

  const cartUpdateHandler = async (product, quantityToUpdate) => {
    try {
      const data = await axios.patch(
        `/api/cart`,
        {
          product,
          quantityToUpdate,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      setRefreshTrigger((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {token ? (
        <div>
          {products && products.length > 0 ? (
            <div>
              <h2> Your Cart Items </h2>
              <div id="cart_container">
                {/* We need the index in this map in order to choose which product quantity we're going to edit */}
                {products.map((product, index) => {
                  const quantityToPurchase = product.requested_quantity;
                  const quantityToUpdate =
                    localQuantities[index].product_quantity;
                  const inStock = product.quantity;

                  return (
                    <div className="cart_product" key={product.id}>
                      <Link to={`/products/${product.id}`}>
                        <img src={product.img} />{" "}
                      </Link>
                      <div>
                        <h3> Brand: {product.brand} </h3>{" "}
                        <h3> Price: {product.price} </h3>
                        <p>Quantity: {quantityToPurchase}</p>
                        <div className="quantity_adjuster">
                          <button onClick={() => decrementQuantity(index)}>
                            -
                          </button>

                          <input
                            type="text"
                            min="1"
                            max={inStock}
                            value={quantityToUpdate}
                            onChange={(e) => e.preventDefault()}
                          />

                          <button
                            onClick={() => incrementQuantity(index, inStock)}
                          >
                            +
                          </button>

                          {quantityToPurchase !== quantityToUpdate ? (
                            <button
                              onClick={() =>
                                cartUpdateHandler(product, quantityToUpdate)
                              }
                            >
                              Update Cart
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <h2>Your cart is empty</h2>
          )}
        </div>
      ) : (
        <h2>You must be logged in to access cart!</h2>
      )}
    </div>
  );
};

export default Cart;
