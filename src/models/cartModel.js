import { Schema, model } from 'mongoose'

const cartSchema = new Schema({
  mail: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
  }
})

const Cart = model('Cart', cartSchema)

export default Cart
