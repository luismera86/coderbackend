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
    res.render('home', {
      msg: 'Usuarios registrado con éxito',
    })
  } catch (error) {
    logger.log('error', error)
    res.status(500).json({ message: 'Error adding user' })
  }
}

export const renderFail = (req, res) => {
  try {
    res.render('register', {
      msg: 'Ya existe un usuario con ese email',
    })
  } catch (error) {
    logger.error(error)
    res.status(500).json({ message: 'Error getting users' })
  }
}
