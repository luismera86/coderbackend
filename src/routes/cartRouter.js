import { addProductToCart, getCart } from '../controllers/cartController.js'

import { Router } from 'express'

const cartRouter = Router()

cartRouter.get('/', getCart)
cartRouter.post('/', addProductToCart)

export default cartRouter
