import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/allProducts.css";

const AllProducts = ({ isAdmin }) => {
  const [products, setProducts] = useState([]);
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [refresh, setRefresh] = useState(false);

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
  }, [refresh]);

    const addProductHandler = async (e) => {
      e.preventDefault();
      const { data } = await axios.post("/api/products",
      {
        brand,
        model,
        type,
        price,
        img,
        quantity,
        description,
      },
      {headers: { 
        Authorization: "Bearer " + window.localStorage.getItem("TOKEN"),
    }});
    setRefresh((refresh) => !refresh);
    };

  return (
    <div>
      <h2> All Products </h2>
      <div id="all_products_container">
      {isAdmin === "true" && (
      <div className="all_products_div">
      <form action="">
        <div>
        <label htmlFor="">
          Brand:
          <br />
          <input
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Model:
          <br />
          <input
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Type:
          <br />
          <input
            placeholder="Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Price:
          <br />
          <input
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        </div>
        <div>
        <label htmlFor="">
          Img:
          <br />
          <input
            placeholder="Img Url"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Quantity:
          <br />
          <input
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br />
        <label htmlFor="">
          Description:
          <br />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <br/>
        <button onClick={addProductHandler}>Add Product</button>
        </div>
      </form>
      </div>)}
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="all_products_div"
                key={product.id}
              >
                <img src={product.img} />
                <div>
                <h3> Brand: {product.brand} </h3>
                <h3> Price: {product.price} </h3>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
  };
export default AllProducts;
