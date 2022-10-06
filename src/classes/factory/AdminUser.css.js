import UserFactory from "./UserFactory.class";

class AdminUser extends UserFactory {
    constructor(user) {
        super();
        this.type = "admin";
    }
}

export default AdminUser