import Cart from '../models/cartModel.js'
import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

export const addProductToCart = async (req, res) => {
  try {
    const user = req.user
    const { productId } = req.body
    const product = await Product.findById(productId)

    const cart = await Cart.findOne({ mail: user.email })

    await cart.updateOne({ $push: { products: product } })

    res.render('cart', { cart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}

export const getCart = async (req, res) => {
  try {
    const user = req.user
    // Verificamos si el usuarios tiene un carrito o si no tiene uno creamos uno nuevo
    const cheExistCart = await Cart.findOne({ mail: user.email })
    console.log(cheExistCart)
    if (!cheExistCart) {
      const cart = new Cart({
        mail: user.email,
        products: [],
      })
      cart.save()
    }
    res.render('cart', { cart: cheExistCart })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}
