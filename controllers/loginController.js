import Users from '../models/Users.js'

export function index (req, res, next) {
    res.locals.error = ''
    res.locals.email = ''
    res.render('loginView')
}

//register
export async function registerUser(req, res, next) {
    try {
        const {name, email, password} = req.body
        const users = new Users({name, email, password})
        await users.save();
        res.status(201).json({message:'User successfully registered', users})
    } catch(error) {
        next(error)
    }
}

//login
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

        console.log(req.session)
        req.session.usersId = users.id
        res.redirect(redir ? redir : '/')
        } catch (error) {
        next(error)
    }
}

export function logoutUser(req, res, next) {
    req.session.regenerate(err => {
        if(err) {
            next(err)
            return
        }
        res.redirect('/')
    })
}
