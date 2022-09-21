import { Router } from 'express'
import loginRouter from './loginRouter.js'
import productsRouter from './productsRouter.js'
import registerRouter from './registerRouter.js'
import usersRouter from './usersRoutes.js'

const routes = Router()
routes.use('/user', usersRouter)
routes.use('/register', registerRouter)
routes.use('/login', loginRouter)
routes.use('/products', productsRouter)

export default routes
