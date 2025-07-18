import Products from '../../models/Products.js'

async function list(req, res, next) {
    try {
        const {
            tag,
            tenToFifty,
            moreThanTen,
            lessThanFifty,
            fifty,
            name,
            skip = 0,
            limit = 10,
            sort = 'name'
        } = req.query

        const filters = {}

        const usersId = req.apiUserId
        if (!usersId) {
            return res.status(401).json({ error: 'You must be logged in' })
        }

        filters.owner = usersId

        // Filtro por tag
        if (tag) filters.tags = tag

        // Filtros de precio
        if (tenToFifty === 'true') {
        filters.price = { $gte: 10, $lte: 50 }
        } else if (moreThanTen === 'true') {
        filters.price = { $gte: 10 }
        } else if (lessThanFifty === 'true') {
        filters.price = { $lte: 50 }
        } else if (fifty === 'true') {
        filters.price = { $eq: 50 }
        }

        // Filtro por nombre
        if (name) filters.name = new RegExp('^' + name, 'i')
        
        const skipValue = Number(skip)
        const limitValue = Number(limit)
        
        const products = await Products.find(filters)
            .skip(skipValue)
            .limit(limitValue)
            .sort({ [sort]: 1 })
            .exec()
        
        const totalProducts = await Products.countDocuments(filters)

        res.status(200).json({
            results: products,
            pagination: {
                total: totalProducts,
                totalPages: Math.ceil(totalProducts / limitValue),
                currentPage: Math.ceil(skipValue / limitValue) + 1
            }
        })
    } catch (error) {
        next(error)
    }
}

async function getProductById(req, res, next) {
    try {
        const productId = req.params.productId

        const product = await Products.findById(productId)

        const userId = req.apiUserId
        if(!userId) {
            return res.status(401).json({ error: 'You must be logged in' })
        }

        if(!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        if(String(product.owner) !== String(userId)) {
            return res.status(404).json({ error: 'Private information' })
        }

        res.status(200).json({
            results: product
        })


    } catch (error) {
        next(error)
    }
}

async function postNewProduct(req, res, next) {
    try {
        const { name, price, tags } = req.body
        const usersId = req.apiUserId

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' })
        }

        let photoFileName = ''
        if (req.file) {
            photoFileName = req.file.filename
        }

        const product = new Products({
            name,
            price,
            photo: photoFileName,
            tags,
            owner: usersId
        })

        await product.save()

        res.status(201).json({ result: product })
    } catch (error) {
        next(error)
    }
}

async function deleteProduct(req, res, next) {
    try {
        const usersId = req.apiUserId
        const productId = req.params.productId
        const result = await Products.deleteOne({ _id: productId, owner: usersId })

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: 'Product not found' })
        }

        res.status(200).json({ message: 'The product was deleted successfully' })
    } catch (error) {
        next(error)
    }
}

async function updateProduct(req, res, next) {
    try {
        const usersId = req.apiUserId
        const productId = req.params.productId
        const product = await Products.findOne({ _id: productId, owner: usersId })
        
        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }
        
        const { name, price, tags } = req.body
        if (name !== undefined) {product.name = name}
        if (price !== undefined) {product.price = price}
        if (tags !== undefined) {product.tags = tags}
        if (req.file) {product.photo = req.file.filename}

        await product.save()
        res.status(200).json({ message: 'Product updated succesfully', product })

    } catch (error) {
        next(error)
    }
}


export default { list, getProductById, postNewProduct, deleteProduct, updateProduct }