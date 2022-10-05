import CustomError from '../utils/CustomError.js'
import MongoClient from './MongoClient.class.js'
import Product from '../models/ProductsModel.js'
import logger from '../utils/logger.js'

class ProductDAO {
  constructor() {
    this.db = new MongoClient()
    this.collection = Product
  }
  async getAll() {
    try {
      await this.db.connect()
      const products = await this.collection.find()
      return products
    } catch (error) {
      logger.error('error', error)
      throw new CustomError(500, 'Error getting all products')
    } finally {
      await this.db.disconnect()
    }
  }
  async getById(id) {
    try {
      await this.db.connect()
      const product = await this.collection.findById(id)
      return product
    } catch (error) {
      logger.error('error', error)
      throw new CustomError(500, 'Error getting product by id')
    } finally {
      await this.db.disconnect()
    }
  }
  async add(product) {
    try {
      await this.db.connect()
      const newProduct = new this.collection(product)
      await newProduct.save()
      return newProduct
    } catch (error) {
      logger.error('error', error)
      throw new CustomError(500, 'Error adding product')
    } finally {
      await this.db.disconnect()
    }
  }
}

export default ProductDAO

/* 
Luego usamos esta class con el siguiente código:
import ProductDAO from '../classes/ProductDAO.class.js'

const productDAO = new ProductDAO()

productDAO.add({name: 'test', price: 100, thumbnail: 'test'}) por ejemplo para agregar un producto
productDAO.getAll() para obtener todos los productos
productDAO.getById('id') para obtener un producto por id

*/