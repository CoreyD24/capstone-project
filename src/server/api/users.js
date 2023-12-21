const express = require("express");
const router = express.Router();
const prisma = require("../client");

// /api/users
router.get("/", async (req, res) => {
    const allUsers = await prisma.users.findMany();
    res.send(allUsers)
});



module.exports = router;