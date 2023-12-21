const express = require("express");
const router = express.Router();
const prisma = require("../client");

// /api/users
router.use("/", (req, res) => {
    res.send(`Welcome to Users`)
})

module.exports = router;