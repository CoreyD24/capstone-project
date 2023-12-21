const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../client");
const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    res.status(401).send({ message: "Incorrect username or password" });
    return;
  }
  try {
    const user = await prisma.users.findUnique({
      where: {
        username,
      },
    });

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
      res.status(401).send({ message: "Not Authorized" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET
    );

    res.status(200).send({ token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "User does not exist" });
  }
});

module.exports = router;
