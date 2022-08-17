const express = require('express')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const config = require('./config/config')
const routes = require('./routes')
const dbConnection = require('./config/mongo.db')


dbConnection()



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
const namer = 'Lucho'
app.set('view engine', 'hbs')
app.get('/', (req, res) => { 

    res.render('home', {
        name: namer
    })
 })




app.listen(PORT, () => {
    console.log(`Servidor conectado al puerto ${PORT}`)
})