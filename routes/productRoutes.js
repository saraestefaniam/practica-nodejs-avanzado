import express from 'express'
import {productsPage, createProduct, paginateProducts} from "../controllers/productsController.js";

const productRoutes = express.Router()

productRoutes.get('/products', productsPage)
productRoutes.post('products', createProduct)
productRoutes.post('/products', paginateProducts)

export default productRoutes

