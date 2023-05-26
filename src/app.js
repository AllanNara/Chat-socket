import express from "express";
import handlebars from "express-handlebars"
import { Server } from "socket.io";
import viewsRouter from "./routes/views.router.js"
import _dirname from "../rootdir.js"
import websocket from "./websocket.js"

const PORT = 8080
const app = express();
const httpServer = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(httpServer)

app.engine("handlebars", handlebars.engine())
app.set("views", `${_dirname}/views`)
app.set("view engine", "handlebars")
app.use(express.static(`${_dirname}/public`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', viewsRouter)

websocket(io)
