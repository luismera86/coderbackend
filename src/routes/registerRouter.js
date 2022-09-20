import { addUser, renderRegister } from '../controllers/registerController.js'

import { Router } from 'express'
import passport from 'passport'
import { upload } from '../middlewares/uploadFiles.js'

// import uploadFiles from '../middlewares/uploadFiles.js'

const registerRouter = Router()

registerRouter.get('/', renderRegister)
registerRouter.post(
  '/',
  passport.authenticate('register', {
    successRedirect: '/login',
    failureRedirect: '/register2',
  }),
  addUser
)

export default registerRouter
