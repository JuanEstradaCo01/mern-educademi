const artesModel = require("../../models/coursesModels/artesModel")

class ArtesCoursesManager {
    constructor(){
        this.model = artesModel
    }

    async getCourses(){
        return this.model.find()
    }

    async addCourse(course){
        return this.model.insertMany(course)
    }
}

module.exports = ArtesCoursesManager