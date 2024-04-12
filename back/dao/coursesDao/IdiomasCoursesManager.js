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

    async deleteCourse(cid, curso){
        return this.model.deleteOne({_id: cid}, curso)
    }
}

module.exports = IdiomasCoursesManager