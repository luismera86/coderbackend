import { Router } from 'express'
import { getCart } from '../controllers/cartController,js'

const cartRouter = Router()

cartRouter.get('/', getCart)

export default cartRouter
