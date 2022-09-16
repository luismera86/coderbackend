const { Router } = require('express')
const loginRoutes = require('./login.routes')
const registerRoutes = require('./register.routes')
const userRoutes = require('./user.routes')


const routes = Router()

routes.use('/user', userRoutes)
routes.use('/login', loginRoutes)
routes.use('/register', registerRoutes)

module.exports = routes
