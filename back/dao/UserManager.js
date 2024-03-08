const userModel = require("../models/userModel")

class UserManager {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return this.model.find()
    }

    async getUserById(uid){
        return this.model.findById(uid)
    }
}

module.exports = UserManager