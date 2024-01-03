const jwt = require("jsonwebtoken");
require("dotenv").config();

const verify = (req, res, next) => {
  const bearer = req.headers.authorization;
  //console.log("bearer", bearer);

  if (!bearer) {
    res.status(401).send({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  //console.log("token", token);

  if (!token) {
    res.status(401).send({ message: "No token provided, NOT AUTHORIZED!" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Invalid Token" });
    return;
  }
};

module.exports = { verify };
