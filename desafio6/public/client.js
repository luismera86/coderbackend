

const socket = io()


const inpTitle = document.querySelector('#title')
const inpPrice = document.querySelector('#price')
const inpThumbnail = document.querySelector('#thumbnail')
const userName = document.querySelector('#userName')
const userMessage = document.querySelector('#userMessage')
const btnSend = document.querySelector('#btnSend')
const noProducts = document.querySelector('#noProducts')
const btnSendChat = document.querySelector('#btnSendChat')



const sendProduct = async() => {
        
        

        try{
                socket.emit('client:enterProduct', { title: inpTitle.value, price: inpPrice.value, thumbnail: inpThumbnail.value }) 
                   console.log('Se envió el producto')
        }catch(error){
                console.log(`Se produjo el error: ${error}`)
        }
}

btnSend.addEventListener('click', (event) => {
        event.preventDefault()  
        sendProduct()
        inpTitle.value = ''
        inpPrice.value = ''
        inpThumbnail.value = ''

})




const renderProduct = async(products)=> { 
        try{
                
        if(products.length > 0){
        const response = await fetch('./plantilla.hbs')
        const plantilla = await response.text()
        document.querySelector('#noProducts').innerHTML=""  
        document.querySelector('#products').innerHTML = ""
        products.forEach(product => {
                const template = Handlebars.compile(plantilla)
                const html = template(product)
                document.querySelector('#products').innerHTML += html
                
        });
        }else{
                document.querySelector('#noProducts').innerHTML = ("<h4>No hay ninguna producto :(</h4>")
                console.log('no hay productos')
        }
        }catch(error){
                console.log(`Se produjo el error: ${error}`)
        }
        
 }


 socket.on('server:products', products => {
        renderProduct(products)
        console.log('Se recibieron los productos')
 })


// Web Chat 

 socket.on('serverSend:message', messages => {
        renderMessage(messages)
        
})

const sendMessage = async() => {
        try{
                 socket.emit('client:message', { userName: userName.value, userMessage: userMessage.value })
                
        }catch(error){
                console.log(`Se produjo el error: ${error}`)
        }
}

btnSendChat.addEventListener('click', (event) => {
        event.preventDefault()
        sendMessage()
        userName.value = ''
        userMessage.value = ''
})

const renderMessage = async(messages) => {
        try{
                if(messages.length > 0){
                const response = await fetch('./chat.hbs')
                const plantilla = await response.text()
                document.querySelector('#chat').innerHTML = ""
                messages.forEach(message => {
                        const template = Handlebars.compile(plantilla)
                        const html = template(message)
                        document.querySelector('#chat').innerHTML += html
                })
                }else{
                        document.querySelector('#chat').innerHTML = ("<h4>No hay ninguna conversación :(</h4>")
                        
                }
               
        }catch(error){
                console.log(`Se produjo el error: ${error}`)
        }
}

