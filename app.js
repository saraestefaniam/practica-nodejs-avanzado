import express from 'express'

const app = express()

//middlewares
app.use(express.json())


app.get('/', (req, res, next) => {
    res.send('Bienvenido a Nodepop')
})


app.get('/products', (req, res, next) => {
    res.send('Aquí van los productos')
})

// error object with error code
app.use((req, rest , next) => {
    const error = new Error('página no encontrada')
    error.status = 400 //user error
    next(error)
})

//Middleware error handler
app.use((err, req, res, next) => {
    res.status(err.status || 500) //if we don't know where the error is coming from we assume it's ours
    res.send('Ocurrió un error: ' + err.message)
})

export default app