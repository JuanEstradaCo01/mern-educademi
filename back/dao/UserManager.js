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

    async addUser(user){
        return this.model.insertMany(user)
    }

    async addUserCourse(uid, data){
        return this.model.updateOne({ _id: uid }, data)
    }
}

module.exports = UserManager