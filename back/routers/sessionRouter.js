const { Router } = require("express")
const { createHash, isValidPassword } = require("../utils/hasheo")
const UserDao = require("../dao/UserManager.js")
const userDao = new UserDao()
const jwt = require("jsonwebtoken")

const sessionRouter = Router()

function generateToken(uidObject) {
    return jwt.sign(uidObject, process.env.SECRET_KEY, { expiresIn: "1h" })
}

sessionRouter.post("/register", async (req, res) => {
    try {
        let { names, lastNames, age, email, phone, password } = req.body

        //Valido si el email ya existe:
        const users = await userDao.getUsers()
        const findUser = users.find(item => item.email === email)
        if (findUser) {
            let body = {}
            body.message = "Email ya registrado"
            body.code = 401
            return res.status(401).json(body)
        }

        //Valido que se llenaron todos los campos:
        if (names === "" || lastNames === "" || age === "" || email === "" || phone === "" || password === "") {
            let body = {}
            body.message = "Completa todos los campos"
            body.code = 401
            return res.status(401).json(body)
        }

        //Encripto la contraseña y envio a la base de datos el usuario aprovado:
        const user = req.body
        user.password = createHash(user.password)
        await userDao.addUser(user)
        user.code = 201

        return res.status(201).json(user)
    } catch (e) {
        return res.status(500).json({
            message: "Ocurrio un error al registrarse, intentalo nuevamente"
        })
    }
})

sessionRouter.post("/login", async (req, res) => {
    try {
        let body = req.body

        let { user, pass } = req.body
        if (user === "" || pass === "") {
            let body = req.body
            body.message = "Completa todos los campos"
            body.code = 404
            return res.status(404).json(body)
        }

        const users = await userDao.getUsers()
        const findUser = users.find(item => item.email === body.user)

        //Valido si existe el correo en la DB:
        if (!findUser) {
            body.code = 401
            body.message = "Usuario no registrado"
            return res.status(401).json(body)
        }

        //Valido si la contraseña es correcta:
        if (!isValidPassword(body.pass, findUser.password)) {
            body.code = 401
            body.message = "Contraseña incorrecta"
            return res.status(401).json(body)
        }

        body.code = 301
        body.uid = findUser._id.toString()
        delete body.pass

        const uidObject = {
            uid: body.uid
        }

        const accessToken = generateToken(uidObject)
        body.token = accessToken
        body.message = "Usuario autenticado correctamente"
        console.log("✅ Iniciaste sesion")

        return res.status(301).cookie("authToken", `${accessToken}`, { signed: true }).json(body)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al iniciar sesion", e
        })
    }
})

sessionRouter.post("/logout", (req, res) => {
    try {
        const token = req.signedCookies.authToken

        if(token === undefined){
            return res.status(404).json({
                code: 404,
                message: "Operacion invalida, no existe una sesion activa"
            })
        }

        console.log("⛔ Sesion cerrada")

        return res.status(200).clearCookie("authToken").json({
            code: 200,
            message: "Sesion cerrada"
        })
    } catch (e) {
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al cerrar sesion", e
        })
    }
})

module.exports = sessionRouter