import { useNavigate } from "react-router-dom";

const Account = ({ setToken }) => {
  const navigate = useNavigate();

  const logOutHandler = () => {
    localStorage.removeItem("TOKEN");
    localStorage.removeItem("Admin");
    setToken(null);
    navigate("/");
  };

  return <button onClick={logOutHandler}>Log Out</button>;
};

export default Account;
