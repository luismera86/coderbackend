// Importación de librerías

import config from './config/config.js'
import express from 'express'

// Importación de configuraciones

const { PORT } = config

const app = express()

app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)	
})
