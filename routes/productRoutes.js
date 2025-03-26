import express from 'express'
import {productsPage, createProduct} from "../controllers/productsController.js";

const productRoutes = express.Router()

productRoutes.get('/products', productsPage)

productRoutes.post('products', createProduct)

export default productRoutes