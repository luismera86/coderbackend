import { Router } from 'express'
import registerRouter from './registerRouter.js'
import usersRouter from './usersRoutes.js'

const routes = Router()
routes.use('/users', usersRouter)
routes.use('/register', registerRouter)

export default routes
