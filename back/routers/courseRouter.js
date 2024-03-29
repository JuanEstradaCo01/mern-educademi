const { Router } = require("express")
const IdiomasDao = require("../dao/coursesDao/IdiomasCoursesManager")
const idiomasDao = new IdiomasDao()
const ProgramacionDao = require("../dao/coursesDao/ProgramacionManager")
const programacionDao = new ProgramacionDao()
const ArtesDao = require("../dao/coursesDao/ArtesCoursesManager")
const artesDao = new ArtesDao()
const GastronomiaDao = require("../dao/coursesDao/GastronomiaCoursesManager")
const gastronomiaDao = new GastronomiaDao()

const courseRouter = Router()

//IDIOMAS: 
courseRouter.get("/idiomas", async (req, res) => {
    try {
        const courses = await idiomasDao.getCourses()

        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al consultar los cursos de idiomas", e
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
        if (find) {
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

        return res.status(201).json({
            success: `Curso agregado exitosamente '${curso}'`
        })
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
            error: "Ocurrio un error al consultar los cursos de programacion", e
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
        if (find) {
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

        return res.status(201).json({
            success: `Curso agregado exitosamente '${curso}'`
        })
    } catch (e) {
        return res.status(500).json({ error: "Ocurrio un error al agregar el curso", e })
    }
})

//ARTES:
courseRouter.get("/artes", async (req, res) => {
    try {
        const courses = await artesDao.getCourses()

        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({
            message: "Ocurrio un error al consultar los cursos de artes", e
        })
    }
})

//Agregar curso de artes:
courseRouter.post("/artes/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios } = req.body

        //Valido si el curso ya existe:
        const artesCursos = await artesDao.getCourses()
        const find = artesCursos.find(item => item.curso === curso)
        if (find) {
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

        await artesDao.addCourse(addCurso)

        return res.status(201).json({
            success: `Curso agregado exitosamente '${curso}'`
        })
    } catch (e) {
        return res.status(500).json({ error: `Ocurrio un error al agregar el curso`, e })
    }
})

//GASTONOMÍA:
courseRouter.get("/gastronomia", async (req, res) => {
    try {
        const courses = await gastronomiaDao.getCourses()

        return res.status(200).json(courses)
    } catch (e) {
        return res.status(500).json({
            message: "Ocurrio un error al consultar los cursos de gastronomía", e
        })
    }
})

//Agregar curso de gastornomía:
courseRouter.post("/gastronomia/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios } = req.body

        //Valido si el curso ya existe:
        const gastronmiaCursos = await gastronomiaDao.getCourses()
        const find = gastronmiaCursos.find(item => item.curso === curso)
        if (find) {
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

        await gastronomiaDao.addCourse(addCurso)

        return res.status(201).json({
            success: `Curso agregado exitosamente '${curso}'`
        })
    } catch (e) {
        return res.status(500).json({ error: `Ocurrio un error al agregar el curso`, e })
    }
})

module.exports = courseRouter