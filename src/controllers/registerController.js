import { Strategy } from 'passport-strategy'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import logger from '../utils/logger.js'
import passport from 'passport'

const { PORT } = config
/* const LocalStrategy = Strategy
const hasPassword = async password => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, _email, done) => {
    try {
      const existingEmail = await User.findOne({ email: req.body.email })

      // Verifica si el mail o el usuario existen
      if (existingEmail) {
        return done(null, false)
      }

      const { firstName, lastName, age, address, phone, password, email } = req.body
      const avatar = `http://localhost:${PORT}/${req.file.filename}`
      console.log(req.file)

      const user = new User({
        firstName,
        lastName,
        age,
        address,
        phone,
        password: hasPassword(password),
        avatar,
        email,
      })
      await user.save()

      return done(null, user)
    } catch (error) {
      logger.info('error', error)
      console.log(error)
    }
  }
)

passport.use('register', registerStrategy)

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})
 */
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
