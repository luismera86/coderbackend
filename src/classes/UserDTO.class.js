class UserDTO {
  constructor(data, user) {
      this.lasName = data.lastName;
      this.firstName = data.firstName;
      this.avatar = data.avatar;

      for (const [key, value] of Object.entries(user)) {
          this[key] = value;
      }
    }    
        
}

export default UserDTO

/* 
Podemos usarlo en el controller 

import UserDTO from "../classes/UserDTO.class.js";

const getUserProfile = async (req, res) => {
    try {
        const users = await User.find()
        const userDTO = new UserDTO(users, req.user) )
        res.status(200).json(userDTO)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

*/