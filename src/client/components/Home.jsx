import "../styles/home.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function getProduct() {
      try {
        const { data: foundProducts } = await axios.get(`/api/products`);
        setProducts(foundProducts);
      } catch (error) {
        console.error(error);
      }
    }
    getProduct();
  }, []);

  return (
    <section id="homeContainer">
      <section id="banner">
        <div id="homePagePictureContainer">
          <img
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.Fv0PoQNbD6nlipJKq01HqwHaFj%26pid%3DApi&f=1&ipt=4e5b59df8822282f9fb33ad96d7b9dcefa5c92a02fa13e6a8c36baf2a8d14a3c&ipo=images"
            alt="Ecommerce"
            id="homePagePicture"
          />
        </div>
        <div id="homeDescriptionContainer">
          <h1>Welcome to our Ecommerce Store!</h1>
          <p>Check out our latest products and deals.</p>
        </div>
      </section>
      <div id="techPicks">
        <h1> Todays Tech Picks! </h1>
      </div>
      <div id="homeProductContainer">
        {products.map((product) => {
          if (product.id == 1 || product.id == 6 || product.id == 8) {
            return (
              <Link to={`/products/${product.id}`} key={product.id}>
                <div className="homeProductCard">
                  <img src={product.img} alt={product.brand} />
                </div>
              </Link>
            );
          }
        })}

        {/* <Link to="/products/1">
                    <div className="homeProductCard">Product 1</div>
                </Link>
                <Link to="/products/6">
                    <div className="homeProductCard">Product 2</div>
                </Link>
                <Link to="/products/8">
                    <div className="homeProductCard">Product 3</div>
                </Link> */}
      </div>
    </section>
  );
};

export default Home;
