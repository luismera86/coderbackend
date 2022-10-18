import User from '../models/userModel.js'
import logger from '../utils/logger.js'

export const failLoginRender = (req, res) => {
  try {
    res.json({ login: false })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const renderLogin = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username })
    req.session.user = user
    res.json({ login: true, user })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
