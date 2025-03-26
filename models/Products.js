import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    name: {type: String, required: true, index: true},
    owner: {ref: 'User', type: mongoose.Schema.Types.ObjectId, required: true},
    price: {type: Number, required: true, index: true},
    photo:{type: String, required: true},
    tags: {type: [String], required: true, index: true}
})

const Products = mongoose.model('Products', productsSchema)

export default Products