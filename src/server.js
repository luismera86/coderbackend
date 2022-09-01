import cluster from 'cluster'
import express from 'express'
import os from 'os'
import router from './routes'

const app = express()
const cpus = os.cpus()

app.get('/', (req, res) => {
  console.log(`LLevo request al worker ${process.pid}`)
  res.send('todo ok')
})

if (cluster.isPrimary) {
  cpus.map(() => cluster.fork())
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died`)
    cluster.fork()
  })
} else {
  app.use('/', router)
  app.listen(3000, () => {
    console.log(`Escuchando el puerto 3000 - worker: ${process.pid}`)
  })
}
