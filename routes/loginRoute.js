import express from 'express'
import { loginUser, index } from '../controllers/loginController.js'

const loginRoute = express.Router()
loginRoute.get('/', index)
loginRoute.post('/', loginUser)


export default loginRoute