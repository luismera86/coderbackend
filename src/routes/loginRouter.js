import { failLoginRender, renderLogin } from '../controllers/loginController.js'

import { Router } from 'express'
import passport from 'passport'

const loginRouter = Router()
loginRouter.get('/faillogin', failLoginRender)
loginRouter.post(
  '/',
  passport.authenticate('login', { failureRedirect: '/login/faillogin'}),
  renderLogin
)

export default loginRouter
