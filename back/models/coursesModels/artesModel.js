const mongoose = require("mongoose")

const collection = "ArtesCurso"

const userSchema = mongoose.Schema({
    curso: {
        type: String,
        unique: true
    },
    titulacion: String,
    duracion: Number,
    descripcion: String,
    conocimientosPrevios: String
})

module.exports = mongoose.model(collection, userSchema)