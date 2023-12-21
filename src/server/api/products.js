const express = require("express");
const prisma = require("../client");
const router = express.Router();

// /api/products gets all the products
router.get("/", async (req, res) => {
        const allProducts = await prisma.products.findMany();
        console.log(allProducts)
        res.send(allProducts)
}) 
// /api/products/monitors
router.get("/monitors", async(req, res)=>{
    try {
        const allMonitors = await prisma.products.findMany({
            where:{type: "monitor"}
            })
            res.send(allMonitors)
        } 
    catch (error) {
        console.log(error)
    }});

router.get("/mice", async(req, res)=>{
    try {
        const allMice = await prisma.products.findMany({
            where:{type: "mouse"}
            })
            res.send(allMice)
        } 
    catch (error) {
        console.log(error)
    }});

router.get("/keyboards", async(req, res)=>{
    try {
        const allKeyboards = await prisma.products.findMany({
            where:{type: "keyboard"}
            })
            res.send(allKeyboards)
        } 
    catch (error) {
        console.log(error)
    }});

router.get("/:id", async (req, res) => {
    try {
        const productId = await prisma.products.findUnique({
            where: {id: +req.params.id}
        })
        res.send(productId)
    } catch (error) {
        console.log(error)
    }
})


// /api/products
// router.use("/", (req, res) => {
//     res.send(`Welcome to Products`)
// })

module.exports = router;