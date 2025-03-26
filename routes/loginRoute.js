import express from 'express'
import { loginPage } from '../controllers/loginController.js'

const loginRoute = express.Router()
loginRoute.get('/login', loginPage)

export default loginRoute