const mongoose = require('mongoose')
const {config} = require('dotenv')
config()

const DB_NAME = process.env.DB_NAME

const dbMongoConnection = async () => {
	try {
		await mongoose.connect(`mongodb://localhost:27017/${DB_NAME}`)

		console.log('Conectado con Base de datos Mongo Local')
	} catch (error) {
		console.log(error)
		throw new Error('Error al inicializar la Base de datos Mongo')
	}
}


module.exports = dbMongoConnection