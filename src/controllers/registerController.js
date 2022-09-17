import User from '../models/userModel.js'
import logger from '../utils/logger.js'

export const renderRegister = (req, res) => {
  try {
    res.render('register')
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const addUser = async (req, res) => {
  try {
    const { firstName, lastName, age, address, phone, password, avatar, email } = req.body

    const user = new User({
      firstName,
      lastName,
      age,
      address,
      phone,
      password,
      avatar,
      email,
    })
    await user.save()
    console.log(user)
    res.status(201).json(user)
  } catch (error) {
    logger.log('error', error)
    res.status(500).json({ message: 'Error adding user' })
  }
}
