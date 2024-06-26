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

const authAdmin = async (req, res, next) => {
    try {
        const adminId = req.params.adminId
        const validateAdminId = await userDao.getUserById(adminId)

        if (!validateAdminId) {
            return res.status(404).json({
                code: 404,
                message: "No se encontro la Auth del admin"
            })
        }

        if (validateAdminId.role !== "Admin") {
            return res.status(401).json({
                code: 401,
                message: "No estas autorizado"
            })
        }
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Autenticacion fallida"
        })
    }

    return next()
}

//Inscribirse a un curso:
courseRouter.post("/:area/inscribirse/:cid", async (req, res) => {
    try {
        const authCookie = req.cookies.authToken
        if(authCookie === undefined){
            return res.status(401).json({
                code: 401,
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
                    return res.status(403).json({
                        code: 403,
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
                    return res.status(403).json({
                        code: 403,
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
                    return res.status(403).json({
                        code: 403,
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
                    return res.status(403).json({
                        code: 403,
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

//Desinscribir usuario de un curso:
courseRouter.post("/desinscribir/:uid/:cid", async (req, res) => {
    try{
        const uid = req.params.uid
        let user = await userDao.getUserById(uid)
        if(!user){
            return res.status(404).json({
                code: 404,
                message: "No se encontro el usuario"
            })
        }

        const cid = req.params.cid
        const indexCurso = user.courses.findIndex(item => item._id == cid)
        if(indexCurso === -1){
            return res.status(404).sjon({
                code: 404,
                message: "No se encontro el curso"
            })
        }
        
        user.courses.splice(indexCurso, 1)
        user = user.toObject()
        delete user.password

        await userDao.updateUser(uid, user)

        return res.status(200).json({
            code: 200,
            message: `Curso eliminado`
        })
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al desinscribir el curso"
        })
    }
})

//Eliminar curso:
courseRouter.delete("/eliminar/:areaCurso/:cid/:adminId", authAdmin, async (req, res) => {
    try{
        const cid = req.params.cid
        const area = req.params.areaCurso

        if(area === "idiomas"){
            const course = await idiomasDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            await idiomasDao.deleteCourse(cid, course)
            
            return res.status(200).json({
                code: 200,
                message: `Se eliminó el curso ${course.curso}`
            })

        }else if(area === "programacion"){
            const course = await programacionDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            await programacionDao.deleteCourse(cid, course)
            
            return res.status(200).json({
                code: 200,
                message: `Se eliminó el curso ${course.curso}`
            })

        }else if(area === "artes"){
            const course = await artesDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            await artesDao.deleteCourse(cid, course)
            
            return res.status(200).json({
                code: 200,
                message: `Se eliminó el curso ${course.curso}`
            })

        }else if(area === "gastronomia"){
            const course = await gastronomiaDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            await gastronomiaDao.deleteCourse(cid, course)
            
            return res.status(200).json({
                code: 200,
                message: `Se eliminó el curso ${course.curso}`
            })

        }else{
            return res.status(404).json({
                code: 404,
                message: `El area no existe`
            })
        }

    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al eliminar el curso"
        })
    }
})

//Traer curso segun su area:
courseRouter.get("/:area/:cid/:adminId", authAdmin, async (req, res) => {
    try{
        const cid = req.params.cid
        const area = req.params.area
        if(area === "idiomas"){
            const course = await idiomasDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            return res.status(200).json(course)
        }else if(area === "programacion"){
            const course = await programacionDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            return res.status(200).json(course)
        }
        else if(area === "artes"){
            const course = await artesDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            return res.status(200).json(course)
        }else if(area === "gastronomia"){
            const course = await gastronomiaDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            return res.status(200).json(course)
        }else{
            return res.status(404).json({
                code: 404,
                message: "El area no existe"
            })
        }
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al consultar el curso"
        })
    }
})

courseRouter.post("/editarcurso/:area/:cid/:adminId", authAdmin, async (req, res) => {
    try{
        const area = req.params.area
        const cid = req.params.cid
        
        if(area === "idiomas"){
            const course = await idiomasDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            const body = req.body

            await idiomasDao.updateCourse(cid, body)

            return res.status(200).json({
                code: 200,
                message: `Se acutalizó el curso ${course.curso}`
            })
        }else if(area === "programacion"){
            const course = await programacionDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            const body = req.body

            await programacionDao.updateCourse(cid, body)

            return res.status(200).json({
                code: 200,
                message: `Se acutalizó el curso ${course.curso}`
            })
        }else if(area === "artes"){
            const course = await artesDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            const body = req.body

            await artesDao.updateCourse(cid, body)

            return res.status(200).json({
                code: 200,
                message: `Se acutalizó el curso ${course.curso}`
            })
        }else if(area === "gastronomia"){
            const course = await gastronomiaDao.getCourseById(cid)
            if(!course){
                return res.status(404).json({
                    code: 404,
                    message: "No se encontro el curso"
                })
            }

            const body = req.body

            await gastronomiaDao.updateCourse(cid, body)

            return res.status(200).json({
                code: 200,
                message: `Se acutalizó el curso ${course.curso}`
            })
        }else{
            return res.status(401).json({
                code: 401,
                message: "No se ha permitido la actualización"
            })
        }

    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al editar el curso"
        })
    }
})

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
            code: 201,
            message: `¡Curso agregado exitosamente! '${curso}'`
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
            code: 201,
            message: `¡Curso agregado exitosamente! '${curso}'`
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
            code: 201,
            message: `¡Curso agregado exitosamente! '${curso}'`
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
            code: 201,
            message: `¡Curso agregado exitosamente! '${curso}'`
        })
    } catch (e) {
        return res.status(500).json({ error: `Ocurrio un error al agregar el curso`, e })
    }
})

module.exports = courseRouter