const express = require("express");
const prisma = require("../client");
const { verify } = require("../util");
const router = express.Router();

//GET /api/cart
//Here the cart will be fully rendered in the cart page
router.get("/", verify, async (req, res) => {
  try {
    // Find the cart that with the users id
    const userCart = await prisma.cart.findFirst({
      where: { userId: req.user.id },
    });

    // If the user doesn't have a cart assigned due to not adding product to cart, send a
    // message saying there are no products in cart
    if (!userCart) {
      res.send({ message: "No Items In cart" });
    } else {
      // else If the users cart exists search the cart_products relationships that are attatched to the users cart
      let cartProducts = await prisma.cart_Products.findMany({
        where: { cart_id: userCart.id },
      });

      // grab all the current id's in the current users cart to make sure admin didn't delete the products
      const keysToValidate = cartProducts.map(
        (cartProduct) => cartProduct.product_id
      );
      // find the products in our db that still exist of admin has deleted
      const validateProducts = await prisma.products.findMany({
        where: {
          id: {
            in: keysToValidate,
          },
        },
      });

      // get the id's of the products still in our database
      const validCartKeys = validateProducts.map(
        (cartProduct) => cartProduct.id
      );
      // filter out the keys that are no longer in our database so we can use them to delete from the cart_products table
      const obsoleteKeys = keysToValidate.filter(
        (key) => !validCartKeys.includes(key)
      );

      // Update cartProducts to reflect only products that are in the table by filtering out the obsolete products
      cartProducts = cartProducts.filter((cartProduct) =>
        validCartKeys.includes(cartProduct.product_id)
      );

      // Delete the obsolete products from our cart_products table so that everything renders correctly.
      const removeAdminDeletedProducts = await prisma.cart_Products.deleteMany({
        where: {
          cart_id: userCart.id,
          product_id: {
            in: obsoleteKeys,
          },
        },
      });

      // find all the products in cart and send it to the front end
      const result = await Promise.all(
        cartProducts.map(async (currentProductRelation, index) => {
          const product = await prisma.products.findUnique({
            where: { id: currentProductRelation.product_id },
          });
          // while mapping through the products, append the quantity that the
          // user requested to product that we're sending back
          product.requested_quantity = currentProductRelation.product_quantity;

          return product;
        })
      );
      //sort the products in cart by the order they were put into the database
      cartProducts.sort((a, b) => a.id - b.id);
      //sort the results as well by the order that we've established in cartProducts above
      result.sort((a, b) => {
        const indexA = cartProducts.findIndex(
          (item) => item.product_id === a.id
        );
        const indexB = cartProducts.findIndex(
          (item) => item.product_id === b.id
        );
        return indexA - indexB;
      });

      res.send({ result, cartProducts });
    }
  } catch (error) {
    console.log(error);
  }
});

// POST /api/cart
//Here users will post from the SingleProduct component
router.post("/", verify, async (req, res) => {
  try {
    const productId = req.body.product.id;
    const quantityRequested = req.body.purchaseQuantity;
    const userId = req.user.id;

    // find the product in the backend using the id provided from the frontend
    const findProduct = await prisma.products.findUnique({
      where: {
        id: +productId,
      },
    });

    if (!findProduct) {
      return res.status(404).send({ error: "Product not found" });
    }

    //find the current users cart if it exists
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    //If the user doesn't have a cart yet, create one and put the ordered product in it
    if (!userCart) {
      const newCart = await prisma.cart.create({
        data: {
          userId: userId,
          total_price: 0.0,
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

      res.status(201).send(newCart);
    } else {
      // See if the user has the requested product in cart_products relation already
      const singleCartProducts = await prisma.cart_Products.findFirst({
        where: {
          product_id: productId,
        },
      });

      // if the user already has it in their cart, then update that product in their cart to their desired quantity
      if (singleCartProducts) {
        const updatedCartProduct = await prisma.cart_Products.update({
          where: {
            id: singleCartProducts.id,
            product_id: productId,
          },
          data: {
            product_quantity: quantityRequested,
          },
        });

        res.status(200).send(updatedCartProduct);
      } else {
        // if not, update the cart under the current user, and add a new cart_product with the provided productId
        // and quantity
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

router.patch("/", verify, async (req, res) => {
  // code to fill out here to properly update the cart
  try {
    const productId = req.body.product.id;
    const quantityRequested = req.body.quantityToUpdate;
    const userId = req.user.id;

    //find the current users cart
    const userCart = await prisma.cart.findUnique({
      where: {
        userId: userId,
      },
    });

    // find the cart_product that has the id of the provided productId
    const cartProductToBeUpdated = await prisma.cart_Products.findFirst({
      where: {
        cart_id: userCart.id,
        product_id: productId,
      },
    });

    //Update the cart_product quantity with the provided quantityRequested by user
    const cartProductUpdated = await prisma.cart_Products.update({
      where: {
        id: cartProductToBeUpdated.id,
      },
      data: {
        product_quantity: quantityRequested,
      },
    });

    res.status(200).send({ message: "Update Successful" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
