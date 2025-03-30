import express from 'express'
import {isLoggedIn} from '../lib/sessionManager.js'
import { productsPage, createProduct, createProductPage, deleteProduct} from "../controllers/productsController.js";


const productRoutes = express.Router()

productRoutes.get('/', productsPage)
productRoutes.get('/new', isLoggedIn, createProductPage)
productRoutes.post('/new', isLoggedIn, createProduct)
productRoutes.get('/delete/:productsId', isLoggedIn, deleteProduct)


export default productRoutes

