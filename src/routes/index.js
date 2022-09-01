import { Router } from 'express'

const router = Router()

router.get('/datos', (req, res) => {
  res.send('Datos')
})

export default router
