import { Strategy } from 'passport-strategy'
import { __dirname } from './utils/path.js'
import config from './config/config.js'
import connectDB from './config/mongoDb.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import logger from './utils/logger.js'
import passport from 'passport'
import path from 'path'
import routes from './routes/index.js'
import session from 'express-session'

const { PORT, SECRET_KEY } = config
const app = express()

export const LocalStrategy = Strategy
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.render('home')
})
app.use('/', routes)
app.use(cookieParser())
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10000,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
