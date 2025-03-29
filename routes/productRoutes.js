import express from 'express'
import { productsPage, createProduct} from "../controllers/productsController.js";


const productRoutes = express.Router()

productRoutes.get('/', productsPage)
productRoutes.post('/create', createProduct)


export default productRoutes

