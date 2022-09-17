import User from '../models/userModel.js'
import logger from '../utils/logger.js'

export const getUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json(users)
  } catch (error) {
    logger.info('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
