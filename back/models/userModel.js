const mongoose = require("mongoose")

const collection = "Users"

const userSchema = mongoose.Schema({
    names: String,
    lastNames: String,
    age: Number,
    email: {
        type: String,
        unique: true
    },
    phone: Number,
    password: String,
    courses: Array,
    role: {
        type: String,
        default: "Usuario"
    }
})

module.exports = mongoose.model(collection, userSchema)