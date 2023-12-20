const prisma = require("../src/server/client");
const bcrypt = require("bcrypt");


async function seed() {
    const john = await prisma.users.create({
        data: {
            username: "John",
            password: await bcrypt.hash("123", 10),
            email: "John@yahoo.com",
            address: "State of John",
            first_name: "John",
            last_name: "Wick",
            phone_number: "8008675309",
            is_admin: true
        },
    });

    const jack = await prisma.users.create({
        data: {
            username: "Jack",
            password: await bcrypt.hash("456", 10),
            email: "Jack@yahoo.com",
            address: "State of Jack",
            first_name: "Jack",
            last_name: "Brick",
            phone_number: "8007777777",
            is_admin: true
        },
    });

    const jill = await prisma.users.create({
        data: {
            username: "Jill",
            password: await bcrypt.hash("789", 10),
            email: "Jill@yahoo.com",
            address: "State of Jill",
            first_name: "Jill",
            last_name: "Pick",
            phone_number: "8008888888"
        },
    });

    const mary = await prisma.users.create({
        data: {
            username: "Mary",
            password: await bcrypt.hash("987", 10),
            email: "Mary@yahoo.com",
            address: "State of Mary",
            first_name: "Mary",
            last_name: "Stick",
            phone_number: "8009999999"
        },
    });

    const hezekiah = await prisma.users.create({
        data: {
            username: "Hezekiah",
            password: await bcrypt.hash("654", 10),
            email: "Hezekiah@yahoo.com",
            address: "State of Hezekiah",
            first_name: "Hezekiah",
            last_name: "Smezekiah",
            phone_number: "8001111111"
        },
    });

    const asusMonitor = await prisma.products.create({
        data: {
            brand: "Asus",
            model: "Type1",
            type: "monitor",
            price: 79.99,
            img: "img",
            quantity: 5,
            description: "The best monitor on the market!"
        }
    });

    const msiMonitor = await prisma.products.create({
        data: {
            brand: "Msi",
            model: "Type2",
            type: "monitor",
            price: 89.99,
            img: "img",
            quantity: 5,
            description: "The clearest monitor on the market!"
        }
    });

    const samsungMonitor = await prisma.products.create({
        data: {
            brand: "Samsung",
            model: "Type3",
            type: "monitor",
            price: 109.99,
            img: "img",
            quantity: 5,
            description: "The most advanced monitor on the market!"
        }
    });

    const asusMouse = await prisma.products.create({
        data: {
            brand: "Asus",
            model: "Type1",
            type: "mouse",
            price: 49.99,
            img: "img",
            quantity: 5,
            description: "The best mouse on the market!"
        }
    });

    const msiMouse = await prisma.products.create({
        data: {
            brand: "Msi",
            model: "Type2",
            type: "mouse",
            price: 59.99,
            img: "img",
            quantity: 5,
            description: "The most precise mouse on the market!"
        }
    });

    const samsungMouse = await prisma.products.create({
        data: {
            brand: "Msi",
            model: "Type3",
            type: "mouse",
            price: 79.99,
            img: "img",
            quantity: 5,
            description: "The most advanced mouse on the market!"
        }
    });

    const asusKeyboard = await prisma.products.create({
        data: {
            brand: "Asus",
            model: "Type1",
            type: "keyboard",
            price: 69.99,
            img: "img",
            quantity: 5,
            description: "The best keyboard on the market!"
        }
    });

    const msiKeyboard = await prisma.products.create({
        data: {
            brand: "Msi",
            model: "Type2",
            type: "keyboard",
            price: 79.99,
            img: "img",
            quantity: 5,
            description: "The most precise keyboard on the market!"
        }
    });

    const samsungKeyboard = await prisma.products.create({
        data: {
            brand: "Samsung",
            model: "Type3",
            type: "keyboard",
            price: 99.99,
            img: "img",
            quantity: 5,
            description: "The most advanced keyboard on the market!"
        }
    });
}

seed()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });