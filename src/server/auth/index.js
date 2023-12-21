const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const prisma = require("../client");
const router = express.Router();
require("dotenv")

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

    res.status(200).send({ message: "Login Sucessful", token });
  } catch (error) {
    console.log(error);
    res.status(401).send({ message: "User does not exist" });
  }
});

router.post("/register", async (req, res, send) => {
  const {
    username,
    password,
    email,
    address,
    first_name,
    last_name,
    phone_number,
  } = req.body;

  const SALT_ROUNDS = 5;
  if (!username || !password) {
    res.status(401).send({ message: "Must provide username and password" });
  }

  const user = await prisma.users.findUnique({
    where: {
      username,
    },
  });

  const foundEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    res.status(401).send({ message: "Username already exists" });
  } else if (foundEmail) {
    res.status(401).send({ message: "Email is already in use" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const newUser = await prisma.users.create({
      data: {
        username,
        password: hashedPassword,
        email,
        address,
        first_name,
        last_name,
        phone_number,
      },
    });

    console.log(newUser);

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET
    );
    res.status(201).send({ message: "Registration successful!", token });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
