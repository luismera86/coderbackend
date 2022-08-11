import express, { json } from 'express'

import MongoStore from 'connect-mongo'
import { auth } from './middleware/auth.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { fileURLToPath } from 'url'
import { login } from './middleware/login.js'
import path from 'path'
import session from 'express-session'

config()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app = express()
const PORT = process.env.PORT
const USER = process.env.USER
const PASS = process.env.PASS
const DB_NAME = process.env.DB_NAME

const mongoOptions = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}

app.use(json())

app.use(express.static(path.join(__dirname, '../public')))

app.use(cookieParser())
app.use(
	session({
		secret: 'luis',
		store: MongoStore.create({
			mongoUrl: `mongodb+srv://${USER}:${PASS}@cluster0.ycmjjlc.mongodb.net/?retryWrites=true&w=majority`,
			mongoOptions,
			dbName: DB_NAME,
		}),
		resave: false,
		saveUninitialized: false,
		rolling: true, // Reinicia el tiempo de expiración con cada request
		cookie: {
			maxAge: 50000,
		},
	})
)

app.get('/', auth, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/home.html'))
})

app.get('/login', login, (req, res) => {
	res.sendFile(path.join(__dirname, '../public/login.html'))

})

app.get('/api/login', login, (req, res) => {
	try {
		
		req.session.username = req.query.username
		res.redirect('/')
		
	} catch (error) {
		console.log(error)
	}
})

app.get('/logout',  (req, res) => {

	req.session.destroy()
	
	res.send('Hasta luego')
})



app.listen(PORT, () => {
	console.log(`Servidor escuchando puerto ${PORT}`)
})
