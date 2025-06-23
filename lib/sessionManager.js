import session from 'express-session'
import MongoStore from 'connect-mongo'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

export const middleware = session({
    name: 'nodepop-session',
    secret: process.env.SESSION_SECRET, //esto no puede ir a un repo, deberia ir en una variable de entorno
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS },
    store: MongoStore.create({
        mongoUrl: process.env.MONGODB_CONNSTR
    })
})

export function useSessionInViews (req, res, next) {
    res.locals.session = req.session
    next()
}

export function isLoggedIn (req, res, next) {
    if (!req.session.usersId) {
        res.redirect(`/login?redir=/products${req.url}`) //si no hay sesión iniciada va al login, si inicia sesion va a la página que había intentado ir en lugar de ir al home
        return
    }
    next()
}