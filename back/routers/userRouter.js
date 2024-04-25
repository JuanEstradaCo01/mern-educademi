const { Router } = require("express")
const UserDao = require("../dao/UserManager.js")
const userDao = new UserDao()
const jwt = require("jsonwebtoken")

const userRouter = Router()

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
            message: "Autenticacion fallida para eliminar el usuario"
        })
    }

    return next()
}

userRouter.get("/user/:uid", async (req, res) => {
    const uid = req.params.uid
    const accessToken = req.cookies.authToken

    if (accessToken === undefined) {
        return res.status(401).json({
            code: 401,
            message: "Acceso negado, ¡Autenticate!"
        })
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, async (err, success) => {
        if (err) {
            return res.status(401).json({
                code: 401,
                message: "Acceso negado, el token es incorrecto o expiró"
            })
        } else {
            try {
                const users = await userDao.getUsers()
                let user = users.find(item => item._id == uid)

                if (!user) {
                    return res.status(404).json({
                        code: 404,
                        message: "El usuario no fue encontrado"
                    })
                }

                user = user.toObject()
                delete user.password
                user.code = 200

                return res.status(200).json(user)
            } catch (e) {
                return res.status(500).json({ code: 500, message: "Ocurrio un error al buscar el usuario", e })
            }
        }
    })
})

userRouter.get("/users/:adminId", authAdmin, async (req, res) => {
    try {
        const authCookie = req.cookies.authToken
        if (authCookie === undefined) {
            return res.status(401).json({
                code: 401,
                message: "¡Inicia sesion!"
            })
        }

        const users = await userDao.getUsers()
        if (!users) {
            return res.status(401).json({
                code: 401,
                message: "Error en la consulta de los usuarios a la DB"
            })
        }

        const filter = users.filter(item => item.role === "Usuario")

        return res.status(200).json(filter)
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al consultar los usuarios"
        })
    }
})

userRouter.delete("/delete/:uid/:adminId", authAdmin, async (req, res) => {
    try {
        const uid = req.params.uid
        const user = await userDao.getUserById(uid)
        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "No se encontro el usuario a eliminar"
            })
        }

        await userDao.deleteUser(uid, user)

        return res.status(200).json({
            code: 200,
            message: `Se eliminó el usuario ${user.names}`
        })
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al eliminar el usuario"
        })
    }
})

userRouter.get("/edituser/:uid/:adminId", authAdmin, async (req, res) => {
    try{
        const uid = req.params.uid
        const user = await userDao.getUserById(uid)

        if(!user){
            return res.status(404).json({
                code: 404,
                message: "No se encontro el usuario"
            })
        }

        return res.status(200).json(user)
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al consultar el usuario"
        })
    }
})

userRouter.post("/edituser/:uid/:adminId", authAdmin, async (req, res) => {
    try {
        const uid = req.params.uid
        const user = await userDao.getUserById(uid)

        if (!user) {
            return res.status(404).json({
                code: 404,
                message: "No se encontró el usuario"
            })
        }

        const body = req.body

        await userDao.updateUser(uid, body)
        
        return res.status(200).json({
            code: 200,
            message: `Se actualizó exitosamente el usuario`
        })
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al editar el usuario"
        })
    }
})

module.exports = userRouter