const programacionModel = require("../../models/coursesModels/programacionModel")

class ProgramacionCoursesManager {
    constructor(){
        this.model = programacionModel
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
}

module.exports = ProgramacionCoursesManager