import User from '../models/user.js'
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
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error adding user' })
  }
}
