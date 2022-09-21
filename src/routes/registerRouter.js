import { addUser, renderFail, renderRegister } from '../controllers/registerController.js'

import { Router } from 'express'
import passport from 'passport'
import { upload } from '../middlewares/uploadFiles.js'

const registerRouter = Router()

registerRouter.get('/', renderRegister)
registerRouter.get('/registerfail', renderFail)
registerRouter.post(
  '/',
  upload.single('avatar'),
  passport.authenticate('register', {
    failureRedirect: '/register/registerfail',
  }),
  addUser
)

export default registerRouter
