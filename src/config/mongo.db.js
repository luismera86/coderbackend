const mongoose = require('mongoose')


const dbConnection = async () => {
	try {
		await mongoose.connect(process.env.MONGODB_CNN)

        console.log('Base de datos MongoDB online')
	} catch (error) {
		console.log(error)
	}
}

module.exports = dbConnection
