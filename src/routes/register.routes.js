const { Router } = require('express')

const { regUser, getRegister } = require('../controller/register.controller')

const registerRoutes = Router()

registerRoutes.get('/register', getRegister)
registerRoutes.post('/register', regUser)

module.exports = registerRoutes
