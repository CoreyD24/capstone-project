const express = require("express");
const morgan = require("morgan");
const ViteExpress = require("vite-express");
require("dotenv").config();
const app = express();

// Middlewares

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", require("./api"));
app.use("/auth", require("./auth"));

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000...")
);
