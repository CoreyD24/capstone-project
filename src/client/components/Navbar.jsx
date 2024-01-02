import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  return (
    <div id="navbar">
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
        <Link to="/login">Login</Link>
        <Link to="/cart">Cart</Link>
      </div>
    </div>
  );
};

export default Navbar;
