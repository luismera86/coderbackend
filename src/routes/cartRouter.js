import { addProductToCart, deleteProductFromCart, getCart } from '../controllers/cartController.js'

import { Router } from 'express'

const cartRouter = Router()

cartRouter.get('/', getCart)
cartRouter.post('/', addProductToCart)
cartRouter.delete('/:id', deleteProductFromCart)

export default cartRouter
