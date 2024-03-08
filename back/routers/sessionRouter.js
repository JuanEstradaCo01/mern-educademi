const { Router } = require("express")
const userModel = require("../models/userModel")
const { createHash, isValidPassword } = require("../utils/hasheo")
const UserDao = require("../dao/UserManager.js")
const userDao =  new UserDao()

const sessionRouter = Router()

sessionRouter.post("/register", async (req, res) => {
    try{
        let {names, lastNames, age, email, phone, password} = req.body

        //Valido si el email ya existe:
        const users = await userDao.getUsers()
        const findUser = users.find(item=>item.email === email)
        if(findUser){
            let body = req.body
            body.message = "Email ya registrado"
            body.code = 401
            return res.status(401).json(body)
        }

        //Valido que se llenaron todos los campos:
        if(names === "" || lastNames === "" || age === "" || email === "" || phone === "" || password === ""){
            let body = req.body
            body.message = "Completa todos los campos"
            body.code = 401
            return res.status(401).json(body)
        }

        //Encripto la contraseña y envio a la base de datos el usuario aprovado:
        const user = req.body
        user.password = createHash(user.password)
        await userModel.insertMany(user)
        user.code = 201
        
        return res.status(201).json(user)
    }catch(e){
        return res.status(500).json({
            error: "Ocurrio un error al registrarse", e
        })
    }
})

sessionRouter.post("/login", async(req, res) => {
    try {
        let body = req.body

        let {user,pass} = req.body
        if(user === "" || pass === ""){
            let body = req.body
            body.message = "Completa todos los campos"
            body.code = 404
            return res.status(404).json(body)
        }
    
        const users = await userDao.getUsers()
        const findUser = users.find(item=>item.email === body.user)
        
        //Valido si existe el correo en la DB:
        if(!findUser){
            body.code = 404
            body.message = "Usuario no registrado"
            return res.status(401).json(body)
        }

        //Valido si la contraseña es correcta:
        if(!isValidPassword(body.pass, findUser.password)){
            body.code = 404
            body.message = "Contraseña incorrecta"
            return res.status(401).json(body)
        }

        req.session.user = findUser._id.toString()
        body.code = 301
        body.uid = findUser._id.toString()
        delete body.pass
    
        return res.status(301).json(body)
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al iniciar sesion", e
        })
    }
})

sessionRouter.get("/logout", (req, res) => {
    req.session.destroy( e => {
        const logout = {
            message: "Logout OK"
        }
        if(!e){
            console.log("Sesion cerrada")
            return res.status(200).json(logout)
        }
        else {
            return res.status(500).json({error: "Logout Error", e})
        }
    })
})

module.exports = sessionRouter