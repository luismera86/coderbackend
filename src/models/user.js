import { Schema, model } from 'mongo'

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
})

export default model('User', userSchema)
