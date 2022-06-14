const express = require('express')

const app = express()

const port = 8080




app.listen(port, (err) =>{
    if(err) {
        console.log('No se encuentra el servido')
    } else {
        console.log(`Escuchando el servidor en el puerto ${port}`)
    }
})