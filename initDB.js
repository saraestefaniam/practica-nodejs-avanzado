import readline from 'node:readline'
import mongoose from 'mongoose'
import connectMongoose from './lib/connectMongoose.js'
import Products from './models/Products.js'
import Users from './models/Users.js'

const connection = await connectMongoose()

const answer = await ask('Are you sure you want to delete database collections? (n)')
if (answer.toLowerCase() !== 'y') {
    console.log('Operation aborted.')
    process.exit()
}

await initUsers()
await initProducts()
await connection.close()


async function initProducts() {
    //delete products
    const deleteProducts = await Products.deleteMany()
    console.log('Products deleted')
    //find users
    const userFound = await Users.find()
    //check if there are users
    if (userFound.length === 0) {
        console.error('There are no users available to associate products')
    }

    //add products
    const insertProducts = await Products.insertMany([
        { name: 'Laptop', owner: userFound[0]._id, price: 1200, photo: './photos/laptop.jpg', tags: ['work', 'lifestyle'] },
        { name: 'Bike', owner: userFound[1]._id, price: 500, photo: './photos/bici.jpg', tags: ['lifestyle', 'motor'] },
        { name: 'iPhone 15', owner: userFound[2]._id, price: 1100, photo: './photos/iphone.jpg', tags: ['mobile', 'lifestyle'] },
        { name: 'Monitor 4K', owner: userFound[0]._id, price: 300, photo: './photos/monitor.jpg', tags: ['work'] },  
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: './photos/moto.jpg', tags: ['motor'] },
        { name: 'Monitor LG', owner: userFound[0]._id, price: 800, photo: './photos/moto.jpg', tags: ['work'] }, 
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: './photos/moto.jpg', tags: ['motor'] }, 
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: './photos/monitor.jpg', tags: ['motor'] }, 
        { name: 'Samsung S22+', owner: userFound[0]._id, price: 650, photo: './photos/samsungs22.jpg', tags: ['mobile'] }, 
        { name: 'Samsung S21', owner: userFound[0]._id, price: 3500, photo: './photos/samsung21.jpg', tags: ['mobile'] }, 
        { name: 'Laptop Asus', owner: userFound[0]._id, price: 1500, photo: './photos/laptopasus.jpg', tags: ['mobile', 'work'] }, 
        { name: 'Mat Yoga', owner: userFound[0]._id, price: 50, photo: './photos/matyoga.jpg', tags: ['lifestyle'] }, 
        { name: 'Mat Yoga', owner: userFound[0]._id, price: 50, photo: './photos/matyoga.jpg', tags: ['lifestyle'] }, 
        { name: 'Desk', owner: userFound[0]._id, price: 80, photo: './photos/desk.jpg', tags: ['lifestyle', 'work'] }, 
        { name: 'Gamer chair', owner: userFound[0]._id, price: 120, photo: './photos/gamerchair.jpg', tags: ['work'] }, 
        { name: 'Mat Yoga', owner: userFound[0]._id, price: 50, photo: './photos/matyoga.jpg', tags: ['lifestyle'] }, 
        { name: 'iPhone 16 pro max', owner: userFound[0]._id, price: 1200, photo: './photos/iphone16promax.jpg', tags: ['lifestyle'] }, 
        { name: 'Mouse bluetooth', owner: userFound[0]._id, price: 25, photo: './photos/mouse.jpg', tags: ['work', 'mobile'] }, 
        { name: 'iPad', owner: userFound[0]._id, price: 400, photo: './photos/ipad.jpg', tags: ['mobile', 'work'] }, 
        { name: 'Notebook', owner: userFound[0]._id, price: 5, photo: './photos/notebook.jpg', tags: ['work'] }, 
        { name: 'Kindle', owner: userFound[0]._id, price: 150, photo: './photos/kindle.jpg', tags: ['mobile', 'lifestyle'] },
        { name: 'Mat Yoga pink', owner: userFound[1]._id, price: 50, photo: './photos/matyogapink.jpg', tags: ['lifestyle'] }, 
        { name: 'MacBook pro', owner: userFound[2]._id, price: 1500, photo: './photos/macbookpro.jpg', tags: ['work'] }, 
        { name: 'Bike Oxxo', owner: userFound[0]._id, price: 250, photo: './photos/bikeoxxo.jpg', tags: ['work', 'lifestyle'] },
        { name: 'Case iPad', owner: userFound[0]._id, price: 50, photo: './photos/caseipad.jpg', tags: ['mobile', 'lifestyle'] },
        { name: 'iPod nano', owner: userFound[0]._id, price: 100, photo: './photos/ipodnano.jpg', tags: ['lifestyle', 'mobile'] },
        { name: 'Headphones JBL', owner: userFound[2]._id, price: 85, photo: './photos/headphones.jpg', tags: ['mobile', 'lifestyle'] },
        { name: 'Moto Vespa', owner: userFound[0]._id, price: 3500, photo: './photos/motovespa.jpg', tags: ['work', 'motor'] },
        { name: 'Backpack Jansport', owner: userFound[2]._id, price: 50, photo: './photos/backpackjan.jpg', tags: ['lifestyle'] }
    ])
        console.log(insertProducts)
}


async function initUsers() {
    //delete users
    const deleteUsers = await Users.deleteMany()
    console.log('Users deleted')
    //ad users
    const insertUsers = await Users.insertMany([
        { _id: new mongoose.Types.ObjectId(), name: 'Alice', email: 'alice@example.com', password: await Users.hashPassword('pass123')},
        { _id: new mongoose.Types.ObjectId(), name: 'Bob', email: 'bob@example.com', password: await Users.hashPassword('pass456') },
        { _id: new mongoose.Types.ObjectId(), name: 'Charlie', email: 'charlie@example.com', password: await Users.hashPassword('pass789') }
    ])
    console.log(insertUsers)
}


async function ask(question) {
    return new Promise((resolve) => {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question(question, (answer) => {
            rl.close();
            resolve(answer);
        });
    });
}