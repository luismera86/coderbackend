// Importación de librerías

import config from './config/config.js'
import express from 'express'
import logger from './utils/logger.js'

// Importación de configuraciones

const { PORT } = config

const app = express()

app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`)	
})
