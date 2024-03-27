const userModel = require("../models/userModel")

class UserManager {
    constructor(){
        this.model = userModel
    }

    async getUsers(){
        return this.model.find()
    }

    async addUser(user){
        return this.model.insertMany(user)
    }
}

module.exports = UserManager