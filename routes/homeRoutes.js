import express from 'express'
import {index} from '../controllers/homeController.js'

const homeRoutes = express.Router()
homeRoutes.get('/', index)

export default homeRoutes