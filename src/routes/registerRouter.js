import { addUser, renderRegister } from '../controllers/registerController.js'

import { Router } from 'express'

const registerRouter = Router()

registerRouter.get('/', renderRegister)
registerRouter.post('/', addUser)

export default registerRouter
