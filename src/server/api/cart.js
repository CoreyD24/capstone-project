const express = require("express");
const prisma = require("../client");
const { verify } = require("../util");
const router = express.Router();

// POST /api/cart
router.post("/", verify, async (req, res) => {
  try {
    const productId = req.body.product.id;
    const userId = req.user.id;
    console.log("User Id:", userId);
    console.log("Product Id:", productId);

    // find the product in the backend using the id provided from the frontend
    const product = await prisma.products.findUnique({
      where: {
        id: +productId,
      },
    });

    if (!product) {
      return res.status(404).send({ error: "Product not found" });
    }

    //find the current users cart if it exists
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    //If the user doesn't have a cart yet, create one
    if (!userCart) {
      const newCart = await prisma.cart.create({
        data: {
          userId: userId,
          total_price: 0.0,
          cart_products: {
            create: [
              {
                product_id: +productId,
                product_quantity: 1,
              },
            ],
          },
        },
      });
      res.status(201).send(newCart);
    } else {
      // otherwise update the already existing cart
      const updatedCart = await prisma.cart.update({
        where: {
          userId: userId,
        },
        data: {
          cart_products: {
            create: [
              {
                product_id: +productId,
                product_quantity: 1,
              },
            ],
          },
        },
      });
      res.status(200).send(updatedCart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
