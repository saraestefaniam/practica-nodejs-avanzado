import express from 'express'
import { productsPage, createProduct} from "../controllers/productsController.js";


const productRoutes = express.Router()

productRoutes.get('/', productsPage)
productRoutes.get('/new', createProduct)


export default productRoutes

