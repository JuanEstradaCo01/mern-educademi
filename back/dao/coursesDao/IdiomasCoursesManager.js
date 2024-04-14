const idiomasModel = require("../../models/coursesModels/idiomasModel")

class IdiomasCoursesManager {
    constructor(){
        this.model = idiomasModel
    }

    async getCourses(){
        return this.model.find()
    }

    async getCourseById(cid){
        return this.model.findById(cid)
    }

    async addCourse(course){
        return this.model.insertMany(course)
    }

    async updateCourse(cid, body){
        const course = await this.getCourseById(cid)

        if(!course){
            throw new Error("El curso no existe")
        }

        const update = {
            _id: body._id || course._id,
            curso: body.curso || course.curso,
            titulacion: body.titulacion || course.titulacion,
            duracion: body.duracion || course.duracion,
            descripcion: body.descripcion || course.descripcion,
            conocimientosPrevios: body.conocimientosPrevios || course.conocimientosPrevios
        }
        
        return this.model.updateOne({ _id: cid }, update)
    }

    async deleteCourse(cid, curso){
        return this.model.deleteOne({_id: cid}, curso)
    }
}

module.exports = IdiomasCoursesManager