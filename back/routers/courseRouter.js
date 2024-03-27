const { Router } = require("express")
const IdiomasDao = require("../dao/coursesDao/IdiomasCoursesManager")
const idiomasDao = new IdiomasDao()
const ProgramacionDao = require("../dao/coursesDao/ProgramacionManager")
const programacionDao = new ProgramacionDao()

const courseRouter = Router()

//IDIOMAS: 
courseRouter.get("/idiomas", async (req, res) => {
    try {
        const courses = await idiomasDao.getCourses()

        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al consultar los cursos", e
        })
    }
})

//Agregar curso de idiomas:
courseRouter.post("/idiomas/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios } = req.body
      
        //Valido si el curso ya existe:
        const idiomasCursos = await idiomasDao.getCourses()
        const find = idiomasCursos.find(item => item.curso === curso)
        if(find){
            let body = {}
            body.message = "Curso ya existente"
            body.code = 401
            return res.status(401).json(body)
        }

        //Valido que se llenaron todos los campos:
        if (curso === undefined || titulacion === undefined || duracion === undefined || descripcion === undefined || conocimientosPrevios === undefined) {
            let body = {}
            body.message = "Completa todos los campos"
            body.code = 401
            return res.status(401).json(body)
        }

        const addCurso = req.body

        await idiomasDao.addCourse(addCurso)

        return res.status(201).json(addCurso)
    } catch (e) {
        return res.status(500).json({ error: "Ocurrio un error al agregar el curso", e })
    }
})

//PROGRAMACION:
courseRouter.get("/programacion", async (req, res) => {
    try {
        const courses = await programacionDao.getCourses()

        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al consultar los cursos", e
        })
    }
})

//Agregar curso de programacion:
courseRouter.post("/programacion/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios } = req.body
      
        //Valido si el curso ya existe:
        const programacionCursos = await programacionDao.getCourses()
        const find = programacionCursos.find(item => item.curso === curso)
        if(find){
            let body = {}
            body.message = "Curso ya existente"
            body.code = 401
            return res.status(401).json(body)
        }

        //Valido que se llenaron todos los campos:
        if (curso === undefined || titulacion === undefined || duracion === undefined || descripcion === undefined || conocimientosPrevios === undefined) {
            let body = {}
            body.message = "Completa todos los campos"
            body.code = 401
            return res.status(401).json(body)
        }

        const addCurso = req.body

        await programacionDao.addCourse(addCurso)

        return res.status(201).json(addCurso)
    } catch (e) {
        return res.status(500).json({ error: "Ocurrio un error al agregar el curso", e })
    }
})

module.exports = courseRouter