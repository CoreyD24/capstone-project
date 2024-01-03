import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

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

  const addToCartHandler = async () => {
    try {
      const data = await axios.post(
        `/api/cart`,
        {
          product,
        },
        {
          headers: {
            Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
          },
        }
      );
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div id="single_product_container" style={{ border: "2px solid black" }}>
        <h3> Brand: {product.brand} </h3>
        <h3> Model: {product.model} </h3>
        <h3> Type: {product.type} </h3>
        <img src={product.img} />
        <p> Description: {product.description} </p>
        <h3> In Stock: {product.quantity} </h3>
        <h3> Price: {product.price} </h3>
      </div>
      <button onClick={addToCartHandler}>Add To Cart</button>
    </div>
  );
};

export default SingleProduct;
