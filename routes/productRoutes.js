import express from 'express'
import {productsPage} from "../controllers/productsController.js";

const productRoutes = express.Router()
productRoutes.get('/products', productsPage)

export default productRoutes