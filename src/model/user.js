

const {Schema} = require('mongoose')
const msgSchema = new Schema({
    author: {
        
        id: {
        type: String
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

module.exports = msgSchema