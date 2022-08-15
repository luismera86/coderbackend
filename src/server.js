const { normalize, schema, denormalize } = require('normalizr')
const express = require('express')
const {config} = require('dotenv')
const { Server: IOServer } = require('socket.io')
const util = require('util')

const dbMongoConnection = require('./config/mongoDB')
const ChatManager = require('./service/chatManager')


config()

function print(objeto) {
	console.log(util.inspect(objeto, false, 12, true))
}


const app = express()

const port = process.env.PORT

const expressServer = app.listen(port, () => { 
    console.log('Conectado al puerto', port)
 })

 const io = new IOServer(expressServer)

const chatManager = new ChatManager()

dbMongoConnection()

app.use(express.static('public'))



io.on('connection', async (socket) => {
	console.log('Se conecto un usuario nuevo')

	const messages = await chatManager.getMessages()


	
	// Normalización 
	
	const messageSchema = new schema.Entity('messages')
	
	const normalizeMessage = normalize(messages, messageSchema)
	print(normalizeMessage)


	socket.emit('server:messages', messages)
	
	socket.on('client:message', async (message) => {
		
	  await chatManager.addMessages(message)
	  const messages = await chatManager.getMessages()
	  io.emit('server:messages', messages)
	}
	)
	
})