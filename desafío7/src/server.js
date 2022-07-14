const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const path = require('path')
const dbSqlite = require('./config/db_config_sqlite')
const dbMariadb = require('./config/db_config_mariadb')
const { Server: IOServer } = require('socket.io')
const ProductsManager = require('./services/productsManager')
const ChatManager = require('./services/chatManager')
const expressServer = app.listen(port, (err) => {
	if (err) {
		console.lo(`Error al escuchar el puerto${port}`)
	} else {
		console.log(`Escuchando puerto ${port}`)
	}
})

const io = new IOServer(expressServer)

const productsManager = new ProductsManager(dbMariadb, 'products')
const chatManager = new ChatManager(dbSqlite, 'messages')

app.use(express.static(path.join(__dirname, '../public')))

io.on('connection', async (socket) => {
	console.log('Se conecto un usuario nuevo')

	const products = await productsManager.getAll()

	socket.emit('server:products', products)
	socket.on('client:enterProduct', async (productInfo) => {
		const { title, price, thumbnail } = productInfo
		await productsManager.newProduct(title, price, thumbnail)
		const products = await productsManager.getAll()

		io.emit('server:products', products)
	})

	// Web Chat

	const messages = await chatManager.getAllMessages()

	io.emit('serverSend:message', messages)

	socket.on('client:message', async (messageInfo) => {
		const { userMail, timeChat, userMessage } = messageInfo
		await chatManager.newMessages(userMail, timeChat, userMessage)
        const messages = await chatManager.getAllMessages()
        
		io.emit('serverSend:message', messages)
	})
	
})
