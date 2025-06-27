import jwt from 'jsonwebtoken'
import Users from '../../models/Users.js'
import createError from 'http-errors'

export async function apiLoginJWT(req, res, next) {
    try{
        const { email, password } = req.body
        const user = await Users.findOne({ email: email })

        if (!user || !(await user.comparePassword(password))) {
            next(createError(401, 'Invalid credentials'))
            return
        }

        jwt.sign({ user_id: user._id }, process.env.JWT_SECRET , {
            expiresIn: '2d'
        }, (err, tokenJWT) => {
            if (err) {
                next (err)
                return
            }
            res.json({ tokenJWT })
        })

    } catch(error) {
        next(error)
    }
}

export async function loginUser(req, res, next) {
    try {
        const { email, password } = req.body
        const redir = req.query.redir
        
        const users = await Users.findOne({ email: email })
        if (!users || !(await users.comparePassword(password))) {
            res.locals.error = 'Invalid credentials'
            res.locals.email = email
            res.render('loginView')
            return 
        }

        req.session.usersId = users.id
        res.redirect(redir ? redir : '/')
        } catch (error) {
        next(error)
    }
}