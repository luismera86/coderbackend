const express = require('express')
const session = require('express-session')

const cookieParser = require('cookie-parser')
const { PORT, SECRET_KEY }= require('./config/config')
const routes = require('./routes')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('./config/mongo.db')






const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
app.use(cookieParser())
app.use(session({
    secret: SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10000
    }
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', routes)
app.set('view engine', 'hbs')
app.get('/', (req, res) => { 

    res.render('home')
 })





 

// ----------------------------- Registro de usuarios ------------------------------------------------------


// Passport 

const bcrypt = require('bcrypt')
const User = require('./model/user')


// Encriptar la contraseña
const hashPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const registerStrategy = new LocalStrategy(
    { passReqToCallback: true}, 
    async (req, username, password, done) => {
        
        try {
            
            const existingUsername = await User.findOne({username: username})
            const existingEmail = await User.findOne({email: req.body.email})

            // Verifica si el mail o el usuario existen
            if (existingUsername || existingEmail) {
                return done(null, false)

            }
          
           
            const newUser = {
                username: username,
                email: req.body.email,
                password: hashPassword(password)
                
            }

            
            const createUser = await User.create(newUser)
            console.log(createUser)

            return done(null, createUser )


    
    
        } catch (error) {
            console.log(error)
            done(err)
        }
    }
        )
        
passport.use('register', registerStrategy)


/* ------------------------------------------- */

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((id, done) => { 
    User.findById(id, done)
 })

/* ------------------------------------------- */


// Rutas 

app.get('/register', async (req = request, res = response) => {
	res.render('register')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/fail'}), (req, res) => { 
    res.render('home', {
        msg: 'Usuarios registrado con éxito'
 })
})

app.get('/fail', (req, res) => { 
    res.render('register', {
        msg: 'El nombre de usuario o mail ya existen'
    })
 })




// --------------------------------- Login de Usuario --------------------------------------


const isValidPassword = (reqPass, password) => {

    return bcrypt.compareSync(  password, reqPass)
}


const loginStrategy = new LocalStrategy( async (username, password, done) => { 


        
         const user = await User.findOne({mail: username})
       
            if(!user || !isValidPassword(user.password, password ) ) {
                
                return done( null, false)
    
            } 
    
        return done(null, user) 
        
  
})

passport.use('login', loginStrategy)


// Rutas



app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin'}), async (req, res) => { 
    const user = await User.findOne({email: req.body.username})

    res.render('login', {
        username: user.username
    })
 })

app.get('/faillogin', (req, res) => { 
    res.render('home', {
        msg: 'Usuario o contraseña no válido'
    })
 })

 app.get('/logout', (req, res) => {
   res.render('home', {
    msg: 'Desconectado'
   })
 }
 )

 app.listen(PORT, () => {
    console.log(`Servidor conectado al puerto ${PORT}`)
})