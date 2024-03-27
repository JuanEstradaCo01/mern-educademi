const server = require("express")
const cors = require("cors")
const sessionRouter = require("./routers/sessionRouter")
const userRouter = require("./routers/userRouter")
const courseRouter = require("./routers/courseRouter")
const MongoSingleton = require("./config/singleton") 
require("dotenv").config()

//Conexion a la base de datos(MongoDB):
MongoSingleton.getConnection()

const app = server()

app.use(cors())
app.use(server.json())
app.use(server.urlencoded({extended: true}))

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => console.log(`Server on port ${PORT}`))

app.use("/", sessionRouter)
app.use("/", userRouter)
app.use("/", courseRouter)