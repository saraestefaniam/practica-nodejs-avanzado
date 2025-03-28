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

//note: in instance methods we don't use arrow functions so we don't change the "this" added by Mongoose
usersSchema.methods.comparePassword = function(clearPassword) {
    return bcrypt.compare(clearPassword, this.password)
}

const Users = mongoose.model('Users', usersSchema)

export default Users