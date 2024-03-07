const userModel = require("../models/userModel")

class UserManager {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return this.model.find()
    }

    async getUserById(id){
        return this.model.findById(id)
    }
}

module.exports = UserManager