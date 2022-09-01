import cluster from 'cluster'
import express from 'express'
import os from 'os'

const app = express()
const cpus = os.cpus()
const PORT = process.argv[2] || 8081
const isCluster = process.argv[3] === 'cluster'

app.get('/', (req, res) => {
  console.log(`LLevo request al worker ${process.pid}`)
  res.send('todo ok')
})

if (cluster.isPrimary && isCluster) {
  // Devuelve true si cluster es un proceso principal o false si es un worker
  cpus.map(() => cluster.fork()) // Iteramos por todos los cpus y por cada cpu crea un subprocess
  cluster.on('exit', worker => {
    console.log(`Worker ${worker.process.pid} died. Date: ${new Date().toLocaleDateString()}`)
    cluster.fork() // Crea un nuevo proceso en caso de que se baje un worker
  })
} else {
  app.listen(PORT, () => {
    console.log(`Escuchando el puerto ${PORT} - Process ID: ${process.pid}. Date: ${new Date().toLocaleDateString()}`)
  })
}

// Muestra en el navegador el numero de procesos ejecutados

app.get('/info', (req, res) => {
  res.send(`Número de procesos ${cpus.length}`)
})
