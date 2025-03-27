import mongoose from 'mongoose'

const usersSchema = new mongoose.Schema({
    name: {type: String, required: true, index:true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
})

const Users = mongoose.model('Users', usersSchema)

export default Users