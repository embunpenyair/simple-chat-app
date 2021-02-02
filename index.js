const env       = require('./env.json')
const express   = require("express")
const app       = express()
const web       = require('./routes/web')
const eta       = require("eta")
const path      = require("path")
const http      = require("http").Server(app)
const io        = require("socket.io")(http)
const body_parser = require("body-parser")
const { Socket } = require('./routes/socket')

app.use(body_parser.json())
app.set("views",path.join(__dirname,"src/views"))
app.set("view engine","eta")
app.engine("html",require("eta").renderFile)
app.use("/assets",express.static("./src/assets"))
app.use("/service_worker.js",express.static("./src/assets/js/service_worker.js"))
app.use("/",require("./routes/web"))
app.use("/api",require("./routes/api"))
app.use("/vue",express.static("./node_modules/vue/dist") )
app.use("/sweetalert2",express.static("./node_modules/sweetalert2/dist") )
app.use("/socket.io",express.static("./node_modules/socket.io-client/dist"))
// socket io 

io.on("connection",(socket) => {
    let IO = io
    console.log("socket in connection")
    Socket(IO,socket)
})

// listen server
http.listen(env.port, () => {
    console.log("App run on ", env.port)
})
