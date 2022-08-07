import { Messages } from '../interfaces/mssage'
import mongoose from 'mongoose'
import { msgSchema } from '../models/userModel'

export class ChatManager {
	public schema = msgSchema
	public collection
	constructor() {
		this.collection = mongoose.model('chatmessages', this.schema)
	}

	async getMessages() {
		try {
			this.collection.find()
		} catch (error) {
			console.log(error)
		}
	}

	async addMessages(message: Messages) {
		try {
			this.collection.insertMany(message)
		} catch (error) {
			console.log(error)
		}
	}
}
