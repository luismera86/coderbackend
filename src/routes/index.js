import { Router } from 'express'
import loginRouter from './loginRouter.js'
import registerRouter from './registerRouter.js'
import usersRouter from './usersRoutes.js'

const routes = Router()
routes.use('/users', usersRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)

export default routes
