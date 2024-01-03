import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = ({ token, isAdmin }) => {
  return (
    <div id="navbar">
      <div>
        <Link to="/home">Home</Link>
      </div>
      <div>
        <Link to="/products">Products</Link>
        {isAdmin === "true" ? <Link to="/users">Users</Link> : ""}
        <Link to="/cart">Cart</Link>
        {token ? (
          <Link to="/account">Account</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
