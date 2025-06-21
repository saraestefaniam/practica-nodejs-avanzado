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


await connectMongoose()

const app = express()

//middlewares
app.use(express.json())
app.use(logger('dev'))
app.use(express.urlencoded({ extended: false }))

app.set('views', 'views') 
app.set('view engine', 'html')
app.engine('html', ejs.__express)
app.locals.appName = 'NodePop'

//routes
app.use(sessionManager.middleware)
app.use(sessionManager.useSessionInViews)
app.use(i18n.init)
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