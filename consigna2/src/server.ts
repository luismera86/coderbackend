import { ChatManager } from './services/chatManager'
import { Server } from 'socket.io'
import { config } from 'dotenv'
import dbMongoConnection from './config/dbMongo'
import express from 'express'

config()

const app = express()

const port = process.env.PORT

const expressServer = app.listen(port, () => { 
    console.log('Conectado con el puerto'+port)
 })

 
 dbMongoConnection()

 const chatManager = new ChatManager()

export const io = new Server(expressServer)

app.use(express.static('public'))



io.on('connection', async (socket) => { 
    console.log('Se conecto un nuevo usuario')

    const messages = chatManager.getMessages()
    io.emit('server:messages', messages)
    io.on('client:message', (messages) => { 
        chatManager.addMessages(messages)
     })

 })