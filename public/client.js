
// Query Selectors

console.log('eje')
const email = document.querySelector('#email').value
const name = document.querySelector('#name').value
const lastName = document.querySelector('#lastName').value
const age = document.querySelector('#age').value
const alias = document.querySelector('#alias').value
const avatar = document.querySelector('#avatar').value
const text = document.querySelector('#text').value
const btnForm = document.querySelector('#btnForm')
const webChat = document.querySelector('#webChat')
const socket = io()



socket.on('server:messages', messages => renderMessages(messages))



const sendMessage = async () => {
    
    try {

        const clientMessage = await {
            author: {
                id: document.querySelector('#email').value,
                name: document.querySelector('#name').value,
                lastName: document.querySelector('#lastName').value,
                age: document.querySelector('#age').value,
                alias: document.querySelector('#alias').value,
                avatar: document.querySelector('#avatar').value,
            },
            text: document.querySelector('#text').value,
        }
        await socket.emit('client:message', clientMessage)
        
    } catch (error) {
        console.log(error)
    }
}


btnForm.addEventListener('click', (event) => { 
    event.preventDefault()
    sendMessage()
    
})

const renderMessages = async ({messages}) => {
    console.log(messages)
    console.log('mesaje recibido')
    try {
        console.log('render')
        console.log(messages)
        if(messages.length > 0) {
            document.querySelector('#webChat').innerHTML = ''
            messages.forEach( message => {
                const { author, text } = message
                const { id, name, lastName, age, alias, avatar } = author
                const insertMessage = `<p class="d-flex justify-content-between"><span>${id}</span><span>${Date.now()}</span><span>${text}</span><span>${avatar}</span></p>`
                document.querySelector('#webChat').innerHTML += insertMessage
            })
        }
        
    } catch (error) {
        console.log(error)
    }
}