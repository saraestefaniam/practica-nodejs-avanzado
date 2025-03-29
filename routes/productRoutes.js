import express from 'express'
import {isLoggedIn} from '../lib/sessionManager.js'
import { productsPage, createProduct, createProductPage} from "../controllers/productsController.js";


const productRoutes = express.Router()

productRoutes.get('/', productsPage)
productRoutes.get('/new', isLoggedIn, createProductPage)
productRoutes.post('/new', isLoggedIn, createProduct)


export default productRoutes

