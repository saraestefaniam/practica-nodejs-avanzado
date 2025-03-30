import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    name: {type: String, index: true},
    owner: {ref: 'Users', type: mongoose.Schema.Types.ObjectId, index: true},
    price: {type: Number, index: true},
    photo:{type: String},
    tags: {type: [String], required: true, index: true}
})

const Products = mongoose.model('Products', productsSchema)

export default Products