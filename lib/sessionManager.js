import session from 'express-session'

const INACTIVITY_EXPIRATION_2_DAYS = 1000 * 60 * 60 * 24 * 2

export const middleware = session({
    name: 'nodepop-session',
    secret: 'w9uT}%X#U*YE(t";]eR&AS[_h2)gb^',
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: INACTIVITY_EXPIRATION_2_DAYS }
})