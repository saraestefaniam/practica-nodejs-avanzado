import express from 'express'
import createError from 'http-errors'
import logger from 'morgan'
import homeRoutes from './routes/homeRoutes.js'
import productRoutes from './routes/productRoutes.js'
import loginRoute from './routes/loginRoute.js'
import connectMongoose from './lib/connectMongoose.js'
import ejs from 'ejs'
import * as sessionManager from './lib/sessionManager.js'
import { logoutUser } from './controllers/loginController.js'
import i18n from './lib/i18nConfigure.js'
import { changeLocale } from './controllers/localeController.js'
import cookieParser from 'cookie-parser'
import path from 'node:path'
import apiProductsController from './controllers/api/apiProductsController.js'
import upload from './lib/uploadConfigure.js'
import { apiLoginJWT } from './controllers/api/apiLoginController.js'
import * as jwtAuth from './lib/jwtAuthMiddleware.js'


await connectMongoose()

const app = express()
const publicPath = path.join(import.meta.dirname, 'public');

//middlewares
app.use(cookieParser())
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.use(i18n.init)
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.static(publicPath));

app.set('views', 'views') 
app.set('view engine', 'html')
app.engine('html', ejs.__express)
app.locals.appName = 'NodePop'

//API routes
app.post('/api/login', apiLoginJWT)
app.get('/api/products', jwtAuth.guard, apiProductsController.list)
app.get('/api/products/:productId', jwtAuth.guard, apiProductsController.getProductById)
app.post('/api/products', upload.single('photo'), jwtAuth.guard, apiProductsController.postNewProduct)
app.delete('/api/products/:productId', jwtAuth.guard, apiProductsController.deleteProduct)
app.put('/api/products/:productId', upload.single('photo'), jwtAuth.guard, apiProductsController.updateProduct)


//routes
app.get('/change-locale/:locale', changeLocale)
app.use('/', homeRoutes)
app.use('/products', productRoutes)
app.use('/login', loginRoute)
app.get('/logout', logoutUser)


// error object with error code
app.use((req, rest , next) => {
    next(createError(404))
})

//Middleware error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500) //if we don't know where the error is coming from we assume it's ours
    res.send('Something went wrong: ' + err.message)
})


export default app