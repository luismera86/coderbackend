const mongoose = require('mongoose')

const dbConnection = async () => {
  try {
    await mongoose.connect('mongodb+srv://luis:1234@cluster0.ycmjjlc.mongodb.net/usersdb')

    console.log('Base de datos MongoDB online')
  } catch (error) {
    console.log(error)
  }

}

dbConnection()
