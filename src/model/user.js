const { Schema, model } =require('mongoose')


const UserSchema = Schema({
    username: {
        type: String,
        required: true, 
    },
    usermail: {
        type: String,
        required: true
    },
    userpassword: {
        type: String,
        required: true
    }
})


module.exports = model('User', UserSchema)