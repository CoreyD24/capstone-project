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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP._MzjpO_7SbrPa0o31BEYGAHaHa%26pid%3DApi&f=1&ipt=22d04a8b06b329fab934e0ff211ff3dfe46b0ecb5ca5cd0a19aeda0664ef01ce&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.N_yZDKb2OKdr7dvTu6glCQHaHa%26pid%3DApi&f=1&ipt=1601ff27e0adf992683256e48077f9d8bb55d17876f1d54ffdf53cc2430a0d48&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.XHRaP3x1Pwn4-C45-5iFGwHaFO%26pid%3DApi&f=1&ipt=aed4ae9cad475ef776d9eb76a550820d79fa62e5bc1d29d575f78a0b118b6768&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.Cez49waorVbHbFDonUQmtAHaFj%26pid%3DApi&f=1&ipt=7ea8000cabbf3dff7eb4295b1749ef013529ca9de0a7d2d2ed5fd6320a25d7e0&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.AHaM5mJOEZRup5cTFSPmKQHaHa%26pid%3DApi&f=1&ipt=19b94154633175d67406818ddeb6d33a9ea4f6ae72d3ab72631a540d20b47576&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.explicit.bing.net%2Fth%3Fid%3DOIP.BexA9WxhZMc3Isy8DjPtkwHaE8%26pid%3DApi&f=1&ipt=f489ab1c0b7f16947445ca4562bfe4924b777485b551f8fe5f041bf3252f0623&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.YEqIOqhGxyfrNGi3oUZ0eQHaEn%26pid%3DApi&f=1&ipt=8ba93547cded17fbb0805b40515f0b68546d227b04169d8938a0bf4136fcce95&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.H_aseSoyiB0W0kSRiaDSwQHaEh%26pid%3DApi&f=1&ipt=edd3e50b6c1c764bd4d7dbe11453552e6bb6b57e2c59bd1d662b77d89254adae&ipo=images",
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
            img: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.42vYplDyBe758oCb_NnwYgHaEK%26pid%3DApi&f=1&ipt=244b7f067207dbcd83fa80ad301698fe6af66ecf9927b297c9f40d416dcd5e4e&ipo=images",
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