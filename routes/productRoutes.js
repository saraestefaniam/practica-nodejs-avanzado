import express from 'express'
import {productsPage, createProduct, paginateProducts} from "../controllers/productsController.js";

const productRoutes = express.Router()

productRoutes.get('/', productsPage)
productRoutes.post('/', createProduct)
productRoutes.post('/', paginateProducts)

export default productRoutes

