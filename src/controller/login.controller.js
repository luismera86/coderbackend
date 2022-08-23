const { response, request } = require('express')

const User = require('../model/user') // await User.insertMany()

const logUser = async (req = request, res = response) => {
	try {
		console.log('hola')
	} catch (error) {
		console.log(error)
	}
}
