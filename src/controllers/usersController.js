import logger from '../utils/logger.js'

export const getUser = async (req, res) => {
  try {
    const user = req.user
    res.render('user', { user })
  } catch (error) {
    logger.error('error', error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
