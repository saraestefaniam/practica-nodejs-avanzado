import express from 'express'

const app = express()

//middlewares
app.use(express.json())

//main route
app.get('/', (req, res, next) => {
    res.send('Bienvenido a Nodepop')
})

export default app