const { response, request } = require('express')
/* const bcrypt = require('bcrypt')
const User = require('../model/user') //await User.insertMany() */

const getRegister = async (req = request, res = response) => {
	res.render('register')
}

const regUser = async (req = request, res = response) => {
	try {
		console.log('Iniciando el registro')
	/* 	 const { username, email, password } = req.body
       
       
       const salt = bcrypt.genSaltSync(10)
       password = bcrypt.hashSync(password, salt)

       await User.insertMany({
        username,
        email,
        password
       })
        */
		res.send('registrado')
	} catch (error) {
		console.log(error)
	}
}

module.exports = {
	regUser,
	getRegister,
}
