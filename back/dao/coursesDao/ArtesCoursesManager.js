const artesModel = require("../../models/coursesModels/artesModel")

class ArtesCoursesManager {
    constructor(){
        this.model = artesModel
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

    async deleteCourse(cid, curso){
        return this.model.deleteOne({_id: cid}, curso)
    }
}

module.exports = ArtesCoursesManager