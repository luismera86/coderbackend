import User from '../models/userModel.js'
import logger from '../utils/logger.js'

export const getUser = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username })
    console.log(user)
    res.status(200).json(user)
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
