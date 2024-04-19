const { Router } = require("express")
const { createHash, isValidPassword } = require("../utils/hasheo")
const UserDao = require("../dao/UserManager.js")
const userDao = new UserDao()
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")

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

        //Envio correo de bienvenida:
        const transport = nodemailer.createTransport({
            host: process.env.PORT, //(para Gmail)
            service: "gmail", //(para Gmail)
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const correo = await transport.sendMail({
            from: process.env.USER,//Correo del emisor
            to: `${email}`,//Correo del receptor
            subject: "Educademi",//Asunto del correo
            html: `<div>
            <h1>¡Te damos la bienvenida a Educademi!</h1>
            <h3>¡Hola, ${names}!</h3>
            <p>Nos alegra mucho tenerte con nosotros, elegiste bien y estamos seguros que no te arrepentiras, ya te inscribiste a un curso? que esperas...</p>
            <hr/>
            <footer><h4>Att: team Educademi</h4></footer>
        </div>`
        })

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

        return res.status(301).cookie("authToken", `${accessToken}`, { signed: true, httpOnly:true, secure: true, sameSite: "none" }).json(body)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al iniciar sesion", e
        })
    }
})

sessionRouter.post("/logout", (req, res) => {
    try {
        const token = req.signedCookies.authToken

        if (token === undefined) {
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

sessionRouter.post("/recuperarcontrasena", async (req, res) => {
    try{
        const { email } = req.body
    
        if(email === "" || undefined){
            return res.status(401).json({
                code: 401,
                message: "¡Completa el campo!"
            })
        }

        const users = await userDao.getUsers()
        const user = users.find(item => item.email === email)

        if(!user){
            return res.status(404).json({
                code: 404,
                message: "¡El correo no esta registrado!"
            })
        }

        //Envio correo:
        const transport = nodemailer.createTransport({
            host: process.env.PORT, //(para Gmail)
            service: "gmail", //(para Gmail)
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const correo = await transport.sendMail({
            from: process.env.USER,//Correo del emisor
            to: `${email}`,//Correo del receptor
            subject: "Educademi",//Asunto del correo
            html: `<div>
            <h1>Recuperar la contraseña de tu cuenta Educademi:</h1>
            <h3>¡Hola, ${user.names}!</h3>
            <p>Solicitaste la recuperacion de contraseña de tu cuenta Educademi.</p>
            <p>Para restablecer tu contraseña da click <a href="http://localhost:3000/recuperandocontrasena/${user._id}">AQUI</a> y sigue con los pasos, gracias por preferirnos.</p>
            <hr/>
            <footer><h4>Att: team Educademi</h4></footer>
        </div>`
        })

        return res.status(200).json({
            code: 200,
            message: "Se envio un correo a la direccion ¡Verifica tu email!"
        })
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al generar el correo"
        })
    }
})

sessionRouter.post("/resetcontrasena/:uid", async ( req, res) => {
    try{
        const uid = req.params.uid
        const user = await userDao.getUserById(uid)

        if(!user){
            return res.status(404).json({
                code: 404,
                message: "El usuario no fue encontrado"
            })
        }

        const { password1, password2 } = req.body

        if(password1 === "" || password2 === ""){
            return res.status(401).json({
                code: 401,
                message: "Completa todos los campos"
            })
        }
    
        if(password1 !== password2){
            return res.status(401).json({
                code: 401,
                message: "¡Las contraseñas no son iguales!"
            })
        }

        const newPassword = createHash(password2)

        //Envio correo:
        const transport = nodemailer.createTransport({
            host: process.env.PORT, //(para Gmail)
            service: "gmail", //(para Gmail)
            port: 587,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })

        const correo = await transport.sendMail({
            from: process.env.USER,//Correo del emisor
            to: `${user.email}`,//Correo del receptor
            subject: "Educademi",//Asunto del correo
            html: `<div>
            <h1>Contraseña restablecida:</h1>
            <h3>¡Hola, ${user.names}!</h3>
            <p>(Este es un correo informativo).</p>
            <p>Se restableció exitosamente la contraseña de tu cuenta Educademi, si no fuiste tú ponte en contacto con soporte, en caso contrario hacer caso omiso.</p>
            <hr/>
            <footer><h4>Att: team Educademi</h4></footer>
        </div>`
        })

        await userDao.updateUserPassword(uid, newPassword)

        return res.status(200).json({
            code: 200, 
            message: "¡Se restableció exitosamente la contraseña!"
        })
    }catch(e){
        return res.status(500).json({
            code: 500,
            message: "Ocurrio un error al restablecer la contraseña"
        })
    }
})

module.exports = sessionRouter