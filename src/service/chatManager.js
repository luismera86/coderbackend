

const mongoose = require('mongoose')
const msgSchema = require('../model/user')


class ChatManager {

    constructor() {
        this.collection = mongoose.model('messages', msgSchema)
    }

    async getMessages() {
		try {
			const messages = await this.collection.find()
			
			return messages
		} catch (error) {
			console.log(error)
		}
	}

    async addMessages(message) {

     
		try {

			
			
			await this.collection.insertMany(message)
		} catch (error) {
			console.log(error)
		}
	}

}

module.exports = ChatManager