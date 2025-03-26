import Products from "../models/Products.js"



export async function productsPage (req, res, next) {
    res.locals.products = await Products.find()
    res.render('productsView')
}

export function createProduct (req, res, next) {
    res.send('Produto creado con éxito')
}