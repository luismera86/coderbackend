import DBClient from './DBClient.class';
import logger from '../utils/logger';
import mongoose from 'mongoose';

class MongoClient extends DBClient {
    constructor() {
        super();
        this.connect = false
        this.client = mongoose
    }
    
    async connect() {
        try {
            await this.client.connect(process.env.MONGO_URI)
            this.connect = true
        } catch (error) {
            const err = new CustomError(500, "Error connecting to MongoDB")
            this.connect = false
            logger.error('error', err)
            throw new Error(error)
        }
    }

    async disconnect() {
        try {
            await this.client.close()
            this.connect = false
            logger.info('info', 'MongoDB connection closed')
        } catch (error) {
            const err = new CustomError(500, "Error disconnecting from MongoDB")
            this.connect = true
            logger.error('error', err)
            throw new Error(error)
        }
    }
 
}

export default MongoClient