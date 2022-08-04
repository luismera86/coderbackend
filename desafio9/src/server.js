const express = require('express')
const app = express()
require('dotenv').config()
const port = process.env.PORT
const path = require('path')


const { Server: IOServer } = require('socket.io')
const ProductsManager = require('./services/productsManager')

const expressServer = app.listen(port, (err) => {
	if (err) {
		console.lo(`Error al escuchar el puerto${port}`)
	} else {
		console.log(`Escuchando puerto ${port}`)
	}
})

const io = new IOServer(expressServer)

const productsManager = new ProductsManager()




app.use(express.static(path.join(__dirname, '../public')))

//Conexiones
app.get('/api/productos-test', (req, res) => { 

	io.on('connection', async (socket) => {
		console.log('Se conecto un usuario nuevo')
	
		const products = await productsManager.getAll()
	
		socket.emit('server:products', products)
		

	})
	
	res.status(200).send('Productos incorporados')

	
	
})
