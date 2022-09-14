const express = require('express')
const session = require('express-session')

const cookieParser = require('cookie-parser')
const { SECRET_KEY, PORT } = require('./config/config')
const routes = require('./routes')
const path = require('path')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
require('./config/mongo.db')

/* DESAFÍO 14 */
const compression = require('compression')
const autocannon = require('autocannon')


/*  CONSIGA DEL DESAFÍO 12 */

const parseArgs = require('minimist')
const args = parseArgs(process.argv.slice(2), {
  alias: {
    p: 'port',
  },
  default: {
    port: 8080,
  },
})

console.log(args.port)

// En la parte inferior se encuentra incorporado el args.port para el app.listen

/* --------------------------------------------- */

const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())
app.use(
  session({
    secret: SECRET_KEY,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      httpOnly: false,
      secure: false,
      maxAge: 10000,
    },
  })
)
app.use(passport.initialize())
app.use(passport.session())

app.use(express.static(path.join(__dirname, '../public')))
app.use('/', routes)
app.set('view engine', 'hbs')
app.get('/', (req, res) => {
  res.render('home')
})

// DESAFÍO 12

const { fork } = require('child_process')

app.get('/info', (req, res) => {
  try {
    res.json({
      path: process.cwd(),
      id_process: process.pid,
      node_v: process.version,
      so: process.platform,
      memory_used: process.memoryUsage(),
      msg_compress: 'Hola'.repeat(6000),
    })

    logger.log('info', 'Get /info')
  } catch (error) {
    logger.log('error', error)
  }
})

app.get('/info-compress', compression(), (req, res) => {

  try {
    res.json({
      path: process.cwd(),
      id_process: process.pid,
      node_v: process.version,
      so: process.platform,
      memory_used: process.memoryUsage(),
      msg_compress: 'Hola'.repeat(6000),
    })
    logger.log('info', 'Get /info-compress')
  } catch (error) {
    logger.log('error', error)
  }
})

 app.get('/api/randoms', (req, res) => {
  const { cant } = req.query

  const forked = fork(path.join(__dirname, './child.js'))

  if (cant === undefined) {
    forked.send(100000000)
  } else {
    forked.send(cant)
  }

  forked.on('message', msg => {
    res.json({
      random_numbers: msg,
    })
  })
}) 

// DESAFÍO 13

const os = require('os')
const cluster = require('cluster')
const cpus = os.cpus()
const PORT = Number(process.argv[2]) || 3000
const isCluster = process.argv[3] === 'cluster'
const isFork = process.argv[3] === 'fork'

if (cluster.isPrimary && isCluster) {
  // Devuelve true si cluster es un proceso principal o false si es un worker
  cpus.map(() => cluster.fork()) // Iteramos por todos los cpus y por cada cpu crea un subprocess
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`)
    cluster.fork() // Crea un nuevo proceso en caso de que se baje un worker
  })
} else if (isFork) {
  // Decimos si entra en modo fork con el pm2 ./src/server.js -- puerto fork
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT} - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
  })
}

// Muestra en el navegador el numero de procesos ejecutados
app.get('/info', (req, res) => {
  res.send(`Número de procesos ${cpus.length}`)
})

// ----------------------------- Registro de usuarios ------------------------------------------------------

// Passport

const bcrypt = require('bcrypt')
const User = require('./model/user')

const error404 = require('./middlewares/error404')
const { logger } = require('./utils/logger')

// Encriptar la contraseña
const hashPassword = password => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const registerStrategy = new LocalStrategy({ passReqToCallback: true }, async (req, username, password, done) => {
  try {
    const existingUsername = await User.findOne({ username })
    const existingEmail = await User.findOne({ email: req.body.email })

    // Verifica si el mail o el usuario existen
    if (existingUsername || existingEmail) {
      return done(null, false)
    }

    const newUser = {
      username,
      email: req.body.email,
      password: hashPassword(password),
    }

    const createUser = await User.create(newUser)
    console.log(createUser)

    return done(null, createUser)
  } catch (error) {
    console.log(error)
  }
})

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

app.get('/register', async (req, res) => {
  try {
    res.render('register')
    logger.log('info', 'Get /register')
  } catch (error) {
    logger.log('error', error)
  }
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/fail' }), (req, res) => {
  try {
    res.render('home', {
      msg: 'Usuarios registrado con éxito',
    })
  } catch (error) {
    logger.log('error', error)
  }
})

app.get('/fail', (req, res) => {
  try {
    res.render('register', {
      msg: 'El nombre de usuario o mail ya existen',
    })
    logger.log('info', 'Get /fail')
  } catch (error) {
    logger.log('error', error)
  }
})

// --------------------------------- Login de Usuario --------------------------------------

const isValidPassword = (reqPass, password) => {
  return bcrypt.compareSync(password, reqPass)
}

const loginStrategy = new LocalStrategy(async (username, password, done) => {
  const user = await User.findOne({ mail: username })

  if (!user || !isValidPassword(user.password, password)) {
    return done(null, false)
  }

  return done(null, user)
})

passport.use('login', loginStrategy)

// Rutas

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin' }), async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.username })

    res.render('login', {
      username: user.username,
    })
  } catch (error) {
    logger.log('error', error)
  }
})

app.get('/faillogin', (req, res) => {
  try {
    res.render('home', {
      msg: 'Usuario o contraseña no válido',
    })
    logger.log('info', 'Get /faillogin')
  } catch (error) {
    logger.log('error', error)
  }
})

app.get('/logout', (req, res) => {
  try {
    res.render('home', {
      msg: 'Desconectado',
    })
  } catch (error) {
    logger.log('error', error)
  }
})


// Integrado el uso de minimist

app.listen(PORT, () => {
  logger.info(`Servidor conectado al puerto ${PORT}`)
})

app.use(error404)