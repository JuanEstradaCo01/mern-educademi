const { Router } = require("express")
const UserDao = require("../dao/UserManager.js")
const userDao = new UserDao()
const jwt = require("jsonwebtoken")

const userRouter = Router()

userRouter.get("/user/:uid", async (req, res) => {
    const uid = req.params.uid
    const accessToken = req.signedCookies.authToken

    if (accessToken === undefined) {
        return res.status(401).json({
            code: 401,
            message: "Acceso negado, ¡Autenticate!"
        })
    }

    jwt.verify(accessToken, process.env.SECRET_KEY, async(err, success) => {
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

module.exports = userRouter