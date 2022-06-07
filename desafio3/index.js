const fs = require('fs')

const express = require('express')

const app = express()

const puerto = 8080

class Contenedor {
	constructor(fileName) {
		this.fileName = fileName
	}
	async save(objeto) {
		let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
		if (!data) {
			objeto.id = 1
			const arr = [objeto]
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(arr))
			return objeto.id
		} else {
			data = JSON.parse(data)
			objeto.id = data.length + 1
			data.push(objeto)
			await fs.promises.writeFile(`./${this.fileName}`, JSON.stringify(data))
			return objeto.id
		}
	}

	async getAll() {
		try {
			let data = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			data = JSON.parse(data)

			return data
		} catch {
			console.log('Error no se puede leer el archivo')
		}
	}

	async getRandom() {
		try {
			let dataR = await fs.promises.readFile(`./${this.fileName}`, 'utf-8')
			dataR = JSON.parse(dataR)
			const productR = dataR[Math.floor(Math.random() * dataR.length)]

			return productR
		} catch {
			console.log('Error no se puede leer el archivo')
		}
	}
}
const productos = new Contenedor('productos.txt')

const listaProductos = async (req, res) => {
	const respuesta = await productos.getAll()
	res.send(respuesta)
}

const productoRandom = async (req, res) => {
	const respuesta = await productos.getRandom()
	res.send(respuesta)
}

app.get('/productos', listaProductos)
app.get('/productoRandom', productoRandom)

app.listen(puerto, () => {
	console.log('servidor escuchando')
})
