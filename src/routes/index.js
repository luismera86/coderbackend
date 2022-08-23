const { Router } = require('express')
const loginRoutes = require('./login.routes')
const registerRoutes = require('./register.routes')
const userRoutes = require('./user.routes')

const routes = Router()

routes.get('/user', userRoutes)
routes.get('/login', loginRoutes)
routes.get('/register', registerRoutes)

module.exports = routes
