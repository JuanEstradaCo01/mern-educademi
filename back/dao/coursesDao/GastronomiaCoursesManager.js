const gastronomiaModel = require("../../models/coursesModels/gastronomiaModel")

class GastronomiaCoursesManager {
    constructor(){
        this.model = gastronomiaModel
    }

    async getCourses(){
        return this.model.find()
    }

    async addCourse(course){
        return this.model.insertMany(course)
    }
}

module.exports = GastronomiaCoursesManager