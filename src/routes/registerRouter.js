import { addUser, renderRegister } from '../controllers/registerController.js'

import { Router } from 'express'
import { upload } from '../middlewares/uploadFiles.js'

const registerRouter = Router()

registerRouter.get('/', renderRegister)
registerRouter.post('/', upload.single('avatar'), addUser)

export default registerRouter
