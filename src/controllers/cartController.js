import Cart from '../models/cartModel.js'
import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

/* 
export const addProductToCart = async (req, res) => {
  try {
    const { productId } = req.params
    const product = await Product.findById(productId)
    const cart = new Cart(req.session.cart ? req.session.cart : {})
    cart.add(product, product.id)
    req.session.cart = cart
    res.redirect('/cart')
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const cart = new Cart()
    res.render('cart', {})
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
} */
