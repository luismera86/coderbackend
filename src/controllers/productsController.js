import Product from '../models/productsModel.js'
import logger from '../utils/logger.js'

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
    console.log(req.body.username)
    res.render('products', { products })
  } catch (error) {
    logger.info('error', error)
    res.status(404).json({ message: error.message })
  }
}
