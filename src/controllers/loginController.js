import logger from '../utils/logger.js'

export const failLoginRender = (req, res) => {
  try {
    res.render('home', {
      msg: 'Email o contraseña incorrectos',
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}

export const renderLogin = (req, res) => {
  try {
    res.render('dashboard')
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
