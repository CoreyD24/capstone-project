const express = require("express");
const prisma = require("../client");
const { verify } = require("../util");
const router = express.Router();

// /api/products
router.get("/", async (req, res) => {
  const allProducts = await prisma.products.findMany();
  res.send(allProducts);
});

// commented out for now
// router.post("/", async (req, res) => {
// const 

// })

// /api/products/monitors
router.get("/monitors", async (req, res) => {
  try {
    const allMonitors = await prisma.products.findMany({
      where: { type: "monitor" },
    });
    res.send(allMonitors);
  } catch (error) {
    console.log(error);
  }
});

// /api/products/mice
router.get("/mice", async (req, res) => {
  try {
    const allMice = await prisma.products.findMany({
      where: { type: "mouse" },
    });
    res.send(allMice);
  } catch (error) {
    console.log(error);
  }
});

// /api/products/keyboards
router.get("/keyboards", async (req, res) => {
  try {
    const allKeyboards = await prisma.products.findMany({
      where: { type: "keyboard" },
    });
    res.send(allKeyboards);
  } catch (error) {
    console.log(error);
  }
});

// /api/products/:id
router.get("/:id", async (req, res) => {
  try {
    const getProductById = await prisma.products.findUnique({
      where: { id: +req.params.id },
    });
    res.send(getProductById);
  } catch (error) {
    console.log(error);
  }
});

// /api/products/delete
router.delete("/delete/:id", async (req, res) => {
  try {
    console.log("Product Deleted")
    const deleteProduct = await prisma.products.delete({
      where: { id: +req.params.id }
    });

    //res.send({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
