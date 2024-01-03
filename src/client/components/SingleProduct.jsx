import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/singleProduct.css";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [purchaseQuantity, setPurchaseQuantity] = useState(1);

  useEffect(() => {
    async function getProduct() {
      try {
        const { data: foundProduct } = await axios.get(`/api/products/${id}`);
        setProduct(foundProduct);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, []);
  const incrementQuantity = async () => {
    if (purchaseQuantity < product.quantity) {
      setPurchaseQuantity(purchaseQuantity + 1);
    }
  };
  const decrementQuantity = async () => {
    if (purchaseQuantity > 1) {
      setPurchaseQuantity(purchaseQuantity - 1);
    }
  };

  const addToCartHandler = async () => {
    try {
      const data = await axios.post(
        `/api/cart`,
        {
          product,
          purchaseQuantity,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
<<<<<<< HEAD
      //console.log(data);
=======
>>>>>>> main
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div id="single_product_page">
      <div id="single_product_container">
        <div>
          <img src={product.img} />
        </div>
        <div id="product_info">
          <h3>
            {" "}
            {product.brand}, {product.type}, {product.model}
          </h3>
          <h3> Price: {product.price} </h3>
          <p> Brand: {product.brand}</p>
          <p> Model: {product.model} </p>
          <p>
            About This Item: <br />
            {product.description}{" "}
          </p>
        </div>
        <section id="quantity_section">
          <div id="quantity_to_cart">
            <p> In Stock: {product.quantity} </p>
            <button onClick={decrementQuantity}>-</button>
            <input
              type="text"
              min="1"
              max={product.quantity}
              value={purchaseQuantity}
            />
            <button onClick={incrementQuantity}>+</button>
          </div>
          <button id="add_to_cart" onClick={addToCartHandler}>
            Add To Cart
          </button>
        </section>
      </div>
    </div>
  );
};

export default SingleProduct;
