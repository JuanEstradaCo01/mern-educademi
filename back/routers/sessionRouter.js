const { Router } = require("express")

const sessionRouter = Router()

sessionRouter.post("/register", (req, res) => {
    try{
        let {names, lastNames, age, email, phone, password} = req.body

        if(names === "" || lastNames === "" || age === "" || email === "" || phone === "" || password === ""){
            let body = req.body
            body.code = 401
            return res.status(401).json(body)
        }
        const body = req.body
        body.code = 301
        
        return res.status(301).json(body)
    }catch(e){
        return res.status(500).json({
            error: "Ocurrio un error al registrarse", e
        })
    }
})

sessionRouter.post("/login", (req, res) => {
    try {
        let body = req.body
        const usuario = "mariana"

        if (body.user !== usuario) {
            console.log("Usuario no encontrado")
            return res.status(404).json({
                NotFound: "usuario no encontrado",
                code: 404
            })
        }

        console.log("Iniciaste sesion")
        return res.status(301).json({
            user: body.user,
            code: 301
        })
    } catch (e) {
        return res.status(500).json({
            error: "Ocurrio un error al iniciar sesion", e
        })
    }
})

module.exports = sessionRouter