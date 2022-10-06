import UserFactory from './UserFactory.class'

class RegisterUser extends UserFactory {
  constructor(user) {
    super()
    this.type = 'register'
  }
}

export default RegisterUser
