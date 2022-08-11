import { Messages } from "../src/interfaces/mssage"
import { io } from "../src/server"

// Query Selectors

const email = document.querySelector('#email')
const name = document.querySelector('#name')
const lastName = document.querySelector('#lastName')
const age = document.querySelector('#age')
const alias = document.querySelector('#alias')
const avatar = document.querySelector('#avatar')
const btnForm = document.querySelector('#btnForm')
const text = document.querySelector('#text')

io.on('server:messages', messages => {
renderMessages(messages)
})

const renderMessages = async (messages: Messages) => {

    try {
        const { author, text} = messages
        const { id, name, lastName, age, alias, avatar } = author
    
       // const insertMessage = insertar el html del mensaje que se va a mostrar
        
    } catch (error) {
        console.log(error)
    }



}


const sendMessage = async () => {

    try {

        if(email !== null) {
            const clientMessage: Messages = {
                author: {
                    id: email.toString(),
                    name: name,
                    lastName: lastName,
                    age: Number(age),
                    alias: alias,
                    avatar: avatar
                },
                text: text
            }
        }

        

        io.emit('client:message', clientMessage)
        
    } catch (error) {

        console.log(error)
        
    }
}