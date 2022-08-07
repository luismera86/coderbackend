import { config } from 'dotenv'
import express from 'express'

config()

const app = express()

const port = process.env.PORT






app.listen(port, () => { 
    console.log('Conectado con el puerto'+port)
 })