import jwt from 'jsonwebtoken'
import createError from 'http-errors'

export function guard(req, res, next) {
    //get tokenJWT from: header, body, query-string
    const tokenJWT = req.get('Authorization') || req.body.jwt || req.query.jwt//método de la request que sirve para leer una cabecera
    //if no token ---> error
    if (!tokenJWT) {
        next(createError(401, 'No token provided'))
        return
    }
    //check token is valid
    jwt.verify(tokenJWT, process.env.JWT_SECRET, (err, payload) => {
        if (err) {
            next(createError(401, 'Invalid token'))
            return
        }
        //point user id on request so next middlewares are able to read it
        req.apiUserId = payload.user_id //este user_id lo creamos en el login
        next()
    })
}