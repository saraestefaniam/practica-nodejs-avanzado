import mongoose from 'mongoose'

const productsSchema = new mongoose.Schema({
    name: {type: String, index: true},
    owner: {ref: 'Users', type: mongoose.Schema.Types.ObjectId, index: true},
    price: {type: Number, index: true},
    photo:{type: String},
    tags: {type: [String], required: true, index: true}
})

productsSchema.statics.list = function(filter, limit, skip, sort) {
    const query = Products.find(filter)
    query.limit(limit)
    query.skip(skip)
    query.sort(sort)
    return query.exec()
}

const Products = mongoose.model('Products', productsSchema)

export default Products