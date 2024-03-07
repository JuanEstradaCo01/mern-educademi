const server = require("express")
const session = require("express-session")
const cors = require("cors")
const sessionRouter = require("./routers/sessionRouter")
const MongoSingleton = require("./config/singleton") 
require("dotenv").config()

//Conexion a la base de datos(MongoDB):
MongoSingleton.getConnection()

const app = server()

app.use(cors())
app.use(server.json())
app.use(server.urlencoded({extended: true}))
app.use(session({
    secret: "secretKey",
    resave: true,
    saveUninitialized: true
}))

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => console.log(`Server on port ${PORT}`))

app.get("/healthCheck", (req, res) => {
    res.json({
        saludo: "Hello world",
        date: new Date().toLocaleTimeString()
    })
})

app.use("/", sessionRouter)