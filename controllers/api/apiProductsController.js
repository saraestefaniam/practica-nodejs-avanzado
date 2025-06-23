import Products from '../../models/Products.js'

async function list(req, res, next) {
    try {
        const products = await Products.list()

        res.json({ result: products })
    } catch (error) {
        next(error)
    }
}

export default { list }