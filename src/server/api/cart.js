const express = require("express");
const prisma = require("../client");
const { verify } = require("../util");
const router = express.Router();

//GET /api/cart
router.get("/", verify, async (req, res) => {
    const cart = await prisma.cart_Products.findMany();
    const result = await Promise.all(cart.map(async(currentProductRelation) => {
      const product = await prisma.products.findUnique({
        where: { id: currentProductRelation.product_id }
       })
       //console.log("product:", product)
       return product;
      }))
      //console.log("result:", result)
      res.send({cart, result})
},[]);
 

// POST /api/cart
router.post("/", verify, async (req, res) => {
  try {
    const productId = req.body.product.id;
    const quantityRequested = req.body.purchaseQuantity;
    const userId = req.user.id;

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
      // See if the user has the requested product in cart already

      const singleCartProducts = await prisma.cart_Products.findFirst({
        where: {
          product_id: product.id,
        },
      });

      // otherwise update the already existing cart
      if (singleCartProducts) {
        const updatedCartProduct = await prisma.cart_Products.update({
          where: {
            id: singleCartProducts.id,
            product_id: product.id,
          },
          data: {
            product_quantity: quantityRequested,
          },
        });

        res.status(200).send(updatedCartProduct);
      } else {
        const updatedCart = await prisma.cart.update({
          where: {
            userId: userId,
          },
          data: {
            cart_products: {
              create: [
                {
                  product_id: +productId,
                  product_quantity: quantityRequested,
                },
              ],
            },
          },
        });

        res.status(200).send(updatedCart);
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

module.exports = router;
