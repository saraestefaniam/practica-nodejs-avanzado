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

        const usersId = req.session?.usersId
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

        res.json({
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

export default { list }