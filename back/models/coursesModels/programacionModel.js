const mongoose = require("mongoose")

const collection = "ProgramacionCurso"

const userSchema = mongoose.Schema({
    curso: {
        type: String,
        unique: true
    },
    titulacion: String,
    duracion: Number,
    descripcion: String,
    conocimientosPrevios: String,
    area: String
})

module.exports = mongoose.model(collection, userSchema)