
class TypeUserFactory {
   
    typeUserDefinition(user) {
        user.type === 'admin' && new AdminUser(user)
        user.type === 'register' && new RegisterUser(user)
    }
}