const server = require("express")
const cors = require("cors")
const sessionRouter = require("./routers/sessionRouter")

const app = server()
app.use(cors())
app.use(server.json())
app.use(server.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.json({
        saludo: "Hello world",
        date: new Date().toLocaleTimeString()
    })
})

const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, () => console.log(`Server on port ${PORT}`))

app.use("/", sessionRouter)