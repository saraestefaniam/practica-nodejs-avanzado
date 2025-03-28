import readline from 'node:readline'
import mongoose from 'mongoose'
import connectMongoose from './mongoose/connectMongoose.js'
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

async function initUsers() {
    //delete users
    const deleteUsers = await Users.deleteMany()
    console.log('Users deleted')
    //ad users
    const insertUsers = await Users.insertMany([
        { _id: new mongoose.Types.ObjectId(), name: 'Alice', email: 'alice@example.com', password: 'pass123' },
        { _id: new mongoose.Types.ObjectId(), name: 'Bob', email: 'bob@example.com', password: 'pass456' },
        { _id: new mongoose.Types.ObjectId(), name: 'Charlie', email: 'charlie@example.com', password: 'pass789' }
    ])
    console.log(insertUsers)
}


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
        { name: 'Laptop', owner: userFound[0]._id, price: 1200, photo: 'laptop.jpg', tags: ['work', 'lifestyle'] },
        { name: 'Bicicleta', owner: userFound[1]._id, price: 500, photo: 'bici.jpg', tags: ['lifestyle', 'motor'] },
        { name: 'iPhone 15', owner: userFound[2]._id, price: 1100, photo: 'iphone.jpg', tags: ['mobile', 'lifestyle'] },
        { name: 'Monitor 4K', owner: userFound[0]._id, price: 300, photo: 'monitor.jpg', tags: ['work'] },  
        { name: 'Moto Yamaha', owner: userFound[1]._id, price: 3500, photo: 'moto.jpg', tags: ['motor'] }, 
    ])
    console.log(insertProducts)
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