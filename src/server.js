const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const config = require('./config/config')
const routes = require('./routes')



const PORT = config.PORT

const app = express()
app.use(cookieParser())
app.use(session({
    secret: 'coder',
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 10000
    }
}))

app.use('/', routes)






app.listen(PORT, () => {
    console.log(`Servidor conectado al puerto ${PORT}`)
})