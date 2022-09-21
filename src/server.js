import './middlewares/passport.js'

import config from './config/config.js'
import connectDB from './config/mongoDb.js'
import cookieParser from 'cookie-parser'
import express from 'express'
import hbs from 'hbs'
import logger from './utils/logger.js'
import passport from 'passport'
import routes from './routes/index.js'
import session from 'express-session'

const { PORT, SECRET_KEY } = config
const app = express()

connectDB()
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
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(express.static('uploads'))
app.set('view engine', 'hbs')
hbs.registerPartials('views/partials')

app.get('/', (req, res) => {
  res.render('home')
})
app.use('/', routes)

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
