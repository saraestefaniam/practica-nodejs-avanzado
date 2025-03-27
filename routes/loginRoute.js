import express from 'express'
import { loginUser } from '../controllers/loginController.js'

const loginRoute = express.Router()
loginRoute.get('/login', loginUser)

export default loginRoute