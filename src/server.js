import { __dirname } from './utils/path.js'
import config from './config/config.js'
import express from 'express'
import logger from './utils/logger.js'
import path from 'path'

const { PORT } = config

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)
})
