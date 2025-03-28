import Products from "../models/Products.js"



export async function productsPage (req, res, next) {
    res.locals.products = await Products.find()
    res.render('productsView')
}


export function createProduct (req, res, next) {
    res.send('Produto creado con éxito')
}

export async function paginateProducts(req, res, next) {
    const { tag, tenToFifty, moreThanTen, lessThanFifty, fifty, name, skip = 0, limit = 10 } = req.query
    const filters = {}

    if (tag) filters.tags = tag
    if (tenToFifty) {
        filters.price = { $gte: 10, $lte: 50 }
    } else if (moreThanTen) {
        filters.price = { $gte: 10 }
    } else if (lessThanFifty) {
        filters.price = { $lte: 50 }
    } else if (fifty) {
        filters.price = { $eq: 50 }
    }
    if (name) filters.name = new RegExp('^' + req.query.name, 'i')
    
    try {
        const products = await Products.find(filters)
            .skip(Number(skip))
            .limit(Number(limit))
            .exec()
        
        const totalProducts = await Products.countDocuments(filters)
        res.json({
            products,
            totalProducts,
            totalPages: Math.ceil(totalProducts / limit),
            currentPage: Math.ceil(skip / limit) + 1
        })
    } catch(error) {
        console.error(error)
        res.status(500).send('Error getting products')
    }
}