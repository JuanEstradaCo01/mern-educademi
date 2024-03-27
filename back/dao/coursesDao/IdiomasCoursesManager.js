const idiomasModel = require("../../models/coursesModels/idiomasModel")

class IdiomasCoursesManager {
    constructor(){
        this.model = idiomasModel
    }

    async getCourses(){
        return this.model.find()
    }

    async addCourse(course){
        return this.model.insertMany(course)
    }
}

module.exports = IdiomasCoursesManager