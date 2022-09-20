import { Strategy } from 'passport-local'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import config from '../config/config.js'
import logger from '../utils/logger.js'
import passport from 'passport'

const { PORT } = config
const LocalStrategy = Strategy
const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}
console.log('entrando al registerStrategy')

const registerStrategy = new LocalStrategy(
  { passReqToCallback: true, usernameField: 'email' },
  async (req, email, password, done) => {
    try {
      console.log(password)
      console.log('verificando')
      const { firstName, lastName, age, address, phone } = req.body
      const existingEmail = await User.findOne({ email })

      // Verifica si el mail o el usuario existen
      if (existingEmail) {
        return done(null, false)
      }

      const avatar = `http://localhost:${PORT}/${req.file.filename}`
      console.log(avatar)
      const user = new User({
        firstName,
        lastName,
        age,
        address,
        phone,
        avatar,
        password: hashPassword(password),
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

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, done)
})

passport.use('register', registerStrategy)
