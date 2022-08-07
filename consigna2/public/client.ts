import { Messages } from "../src/interfaces/mssage"
import { io } from "../src/server"

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

        const clientMessage = 'Ingresar el objeto llamado por los input del html'

        io.emit('client:message', clientMessage)
        
    } catch (error) {

        console.log(error)
        
    }
}