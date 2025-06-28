import 'dotenv/config'
import connectMongoose from './lib/connectMongoose.js'
import Users from './models/Users.js'

const usersToInsert = [
    { name: 'Admin', email: 'admin@example.com', password: '1234' },
    { name: 'User One', email: 'user1@example.com', password: '1234' }
]

async function apiInit() {
    try {
        await connectMongoose()

        for (const user of usersToInsert) {
            const exists = await Users.findOne({ email: user.email })
            if(!exists) {
                const newUser = new Users(user)
                await newUser.save()
                console.log(newUser)
            } else {
                console.log(`This user already exists: ${user.email}`)
            }
        }
        console.log('API initialization successful')
        process.exit(0)
    } catch (err) {
        console.error('Error', err)
        process.exit(1)
    }
}

apiInit()