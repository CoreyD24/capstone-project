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
            src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fmedia.giphy.com%2Fmedia%2FYk3CHhjkOkxSE%2Fgiphy-downsized-large.gif&f=1&nofb=1&ipt=3d38cc64445c9f863b889813d12e6c0fa66bd737960ee05ea75c8e4a49ce98e9&ipo=images"
            alt="Ecommerce"
            id="homePagePicture"
          />
        </div>
        <div id="homeDescriptionContainer">
          <h1>Welcome to Tyler's Tech Trio!</h1>
          <h2>The one stop shop for every angry gamer's needs.</h2>
        </div>
      </section>
      <div id="techPicks">
        <h1> Todays Most Picked Replacements </h1>
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
