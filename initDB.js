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
        { name: 'Laptop', owner: userFound[0]._id, price: 1200, photo: '', tags: ['work', 'lifestyle'] },
        { name: 'Bike', owner: userFound[1]._id, price: 500, photo: '', tags: ['lifestyle', 'motor'] },
        { name: 'iPhone 15', owner: userFound[2]._id, price: 1100, photo: '', tags: ['mobile', 'lifestyle'] },
        { name: 'Monitor 4K', owner: userFound[0]._id, price: 300, photo: '', tags: ['work'] },  
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: '', tags: ['motor'] },
        { name: 'Monitor LG', owner: userFound[0]._id, price: 800, photo: '', tags: ['work'] }, 
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: '', tags: ['motor'] }, 
        { name: 'Moto Yamaha', owner: userFound[0]._id, price: 3500, photo: '', tags: ['motor'] }, 
        { name: 'Samsung S22+', owner: userFound[0]._id, price: 650, photo: '', tags: ['mobile'] }, 
        { name: 'Samsung S21', owner: userFound[0]._id, price: 3500, photo: '', tags: ['mobile'] }, 
        { name: 'Laptop Asus', owner: userFound[0]._id, price: 1500, photo: '', tags: ['mobile', 'work'] }, 
        { name: 'Mat Yoga', owner: userFound[0]._id, price: 50, photo: '', tags: ['lifestyle'] }, 
        { name: 'Mat Yoga', owner: userFound[0]._id, price: 50, photo: '', tags: ['lifestyle'] }, 
        { name: 'Desk', owner: userFound[0]._id, price: 80, photo: '', tags: ['lifestyle', 'work'] }, 
        { name: 'Gamer chair', owner: userFound[0]._id, price: 120, photo: '', tags: ['work'] }, 
        { name: 'Kindle', owner: userFound[0]._id, price: 150, photo: '', tags: ['mobile', 'lifestyle'] },
        { name: 'Mat Yoga pink', owner: userFound[1]._id, price: 50, photo: '', tags: ['lifestyle'] }, 
        { name: 'Headphones JBL', owner: userFound[2]._id, price: 85, photo: '', tags: ['mobile', 'lifestyle'] },
        { name: 'Moto Vespa', owner: userFound[0]._id, price: 3500, photo: '', tags: ['work', 'motor'] },
        { name: 'Backpack Jansport', owner: userFound[2]._id, price: 50, photo: '', tags: ['lifestyle'] }
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