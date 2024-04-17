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

    async updateUser(uid, body){
        const user = await this.getUserById(uid)

        if(!user){
            throw new Error("El usuario no existe")
        }

        const update = {
            _id: body._id || user._id,
            names: body.names || user.names,
            lastNames: body.lastNames || user.lastNames,
            age: body.age || user.age,
            email: body.email || user.email,
            phone: body.phone || user.phone,
            password: user.password,
            courses: body.courses || user.courses,
            role: user.role
        }
        
        return this.model.updateOne({ _id: uid }, update)
    }

    async updateUserPassword(uid, password){
        const user = await this.getUserById(uid)

        if(!user){
            throw new Error("El usuario no existe")
        }

        const update = {
            password: password,
        }
        
        return this.model.updateOne({ _id: uid }, update)
    }

    async addUserCourse(uid, data){
        return this.model.updateOne({ _id: uid }, data)
    }

    async deleteUser(uid, user){
        return this.model.deleteOne({_id: uid}, user)
    }
}

module.exports = UserManager