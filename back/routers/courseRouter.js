const { Router } = require("express")
const IdiomasDao = require("../dao/coursesDao/IdiomasCoursesManager")
const idiomasDao = new IdiomasDao()
const ProgramacionDao = require("../dao/coursesDao/ProgramacionManager")
const programacionDao = new ProgramacionDao()
const ArtesDao = require("../dao/coursesDao/ArtesCoursesManager")
const artesDao = new ArtesDao()
const GastronomiaDao = require("../dao/coursesDao/GastronomiaCoursesManager")
const gastronomiaDao = new GastronomiaDao()
const UserDao = require("../dao/UserManager")
const userDao = new UserDao()

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

//Agregar un curso de idiomas:
courseRouter.post("/idiomas/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios, area } = req.body
        console.log({ curso, titulacion, duracion, descripcion, conocimientosPrevios, area })

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
        if (curso === "" || titulacion === "" || duracion === "" || descripcion === "" || conocimientosPrevios === "" || area === "") {
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

//Inscribirse a un curso:
courseRouter.post("/:area/inscribirse/:cid", async (req, res) => {
    try {
        const authCookie = req.signedCookies.authToken
        if(authCookie === undefined){
            return res.status(404).json({
                code: 404,
                message: "¡Inicia sesion!"
            })
        }

        //Valido si el usuario existe:
        const uid = req.body.uid
        const user = await userDao.getUserById(uid)
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "El usuario no esta registrado en la base de datos"
            })
        }

        //Verifico el area al que pertenece el curso, valido si el curso existe usando su respectivo Dao y agrego el curso:
        const area = req.params.area
        if (area === "idiomas" || "programacion" || "artes" || "gastronomia") {

            const cid = req.params.cid
            if (area === "idiomas") {
                const course = await idiomasDao.getCourseById(cid)

                if (!course) {
                    return res.status(404).json({
                        code: 404,
                        message: "El curso no corresponde al area especificada"
                    })
                }

                //Agrego el curso al usuario:
                const verificar = user.courses.find(item => item.curso === course.curso)
                if(verificar){
                    return res.status(401).json({
                        code: 401,
                        message: "Ya estas inscrito a este curso"
                    })
                }
                user.courses.push(course)
                await userDao.addUserCourse(uid, user)

                return res.status(200).json({
                    code: 200,
                    message: `Curso de ${course.curso} agregado`
                })

            } else if (area === "programacion") {
                const course = await programacionDao.getCourseById(cid)

                if (!course) {
                    return res.status(404).json({
                        code: 404,
                        message: "El curso no corresponde al area especificada"
                    })
                }

                //Agrego el curso al usuario:
                const verificar = user.courses.find(item => item.curso === course.curso)
                if(verificar){
                    return res.status(401).json({
                        code: 401,
                        message: "Ya estas inscrito a este curso"
                    })
                }
                user.courses.push(course)
                await userDao.addUserCourse(uid, user)

                return res.status(200).json({
                    code: 200,
                    message: `Curso de ${course.curso} agregado`
                })

            } else if (area === "gastronomia") {
                const course = await gastronomiaDao.getCourseById(cid)

                if (!course) {
                    return res.status(404).json({
                        code: 404,
                        message: "El curso no corresponde al area especificada"
                    })
                }

                //Agrego el curso al usuario:
                const verificar = user.courses.find(item => item.curso === course.curso)
                if(verificar){
                    return res.status(401).json({
                        code: 401,
                        message: "Ya estas inscrito a este curso"
                    })
                }
                user.courses.push(course)
                await userDao.addUserCourse(uid, user)

                return res.status(200).json({
                    code: 200,
                    message: `Curso de ${course.curso} agregado`
                })

            } else if (area === "artes") {
                const course = await artesDao.getCourseById(cid)

                if (!course) {
                    return res.status(404).json({
                        code: 404,
                        message: "El curso no corresponde al area especificada"
                    })
                }

                //Agrego el curso al usuario:
                const verificar = user.courses.find(item => item.curso === course.curso)
                if(verificar){
                    return res.status(401).json({
                        code: 401,
                        message: "Ya estas inscrito a este curso"
                    })
                }
                user.courses.push(course)
                await userDao.addUserCourse(uid, user)

                return res.status(200).json({
                    code: 200,
                    message: `Curso de ${course.curso} agregado`
                })
            }
        }

        return res.status(404).json({
            code: 404,
            message: "El area del curso es invalida"
        })

    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error para inscribirse, intentalo más tarde", e
        })
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
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios, area } = req.body

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
        if (curso === "" || titulacion === "" || duracion === "" || descripcion === "" || conocimientosPrevios === "" || area === "") {
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
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios, area } = req.body

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
        if (curso === "" || titulacion === "" || duracion === "" || descripcion === "" || conocimientosPrevios === "" || area === "") {
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

//Agregar curso de gastronomía:
courseRouter.post("/gastronomia/addcurso", async (req, res) => {
    try {
        let { curso, titulacion, duracion, descripcion, conocimientosPrevios, area } = req.body

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
        if (curso === "" || titulacion === "" || duracion === "" || descripcion === "" || conocimientosPrevios === "" || area === "") {
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