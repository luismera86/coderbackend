import { Schema } from "mongoose";

export const msgSchema = new Schema({
    author: {
        
        id: {
        type: Number
        },
        name: {
            type: String
        },
        lastName: {
            type: String        
        },
        age: {
            type: Number
        },
        alias: {
            type: String
        },
        avatar: {
            type: String
        }
        
    },
    text: {
        type: String
    }
})