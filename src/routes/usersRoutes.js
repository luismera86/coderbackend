import { Router } from 'express'
import { getUser } from '../controllers/usersController.js'

const usersRouter = Router()

usersRouter.get('/', getUser)

export default usersRouter
