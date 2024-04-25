const server = require("express")
const cors = require("cors")
const sessionRouter = require("./routers/sessionRouter")
const userRouter = require("./routers/userRouter")
const courseRouter = require("./routers/courseRouter")
const MongoSingleton = require("./config/singleton") 
const cookieParser = require("cookie-parser")
require("dotenv").config()

//Conexion a la base de datos(MongoDB):
MongoSingleton.getConnection()

const app = server()

app.use(cookieParser())
app.use(server.json())
app.use(server.urlencoded({extended: true}))
app.use(cors({
    origin: "https://mern-educademi.vercel.app",
    credentials: true
}))

const PORT = process.env.PORT || 10000

const httpServer = app.listen(PORT, () => console.log(`Server on port ${PORT}`))

app.use("/", sessionRouter)
app.use("/", userRouter)
app.use("/", courseRouter)