const express = require("express");
const router = express.Router();

// /api/users
router.use("/users", require("./users"));
// /api/products
router.use("/products", require("./products"));

// /api
router.use("/", (req, res) => {
    res.send(`Welcome to the API`)
})

module.exports = router;