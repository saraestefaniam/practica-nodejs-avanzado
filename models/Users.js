import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const usersSchema = new mongoose.Schema({
    name: {type: String, required: true, index:true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
})

usersSchema.statics.hashPassword = (clearPassword) => {
    return bcrypt.hash(clearPassword, 7)
}
const Users = mongoose.model('Users', usersSchema)

export default Users