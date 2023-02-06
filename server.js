require('dotenv').config()
const express = require('express')
const app = express()
// const port = 4001

const PORT = process.argv[2] || 8080
const PID = process.pid



const { Server: HttpServer } = require("http");
const { Server: IOserver } = require("socket.io");
const httpServer = new HttpServer(app);
const io = new IOserver(httpServer);
const logger= require('../coliving-back/utils/logs')
const {rutasLugares} = require('./rutas/rutas-lugares')
const {rutasUsuarios} = require('./sessions')
const {connectDB}=require('./config')
const ejs = require('ejs');
const cookieParser = require('cookie-parser')


connectDB()
app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.use(express.json())
app.use(express.urlencoded({extended: true}))

rutasUsuarios.use(express.static('public'))
app.use('/api/lugares', rutasLugares)
app.use('/api/usuarios', rutasUsuarios)
app.use(cookieParser())

const mensajes= []
io.on('connection',(socket)=>{
    io.sockets.emit('mensajes', (mensajes))
    socket.on('envio_mensaje', (mensaje)=>{
        mensajes.push(mensaje)
        console.log('lado servidor')
        io.sockets.emit('mensajes', (mensajes))
    })
})


rutasUsuarios.get('/chat',(req,res)=>{
    // console.log(req.session.user_id)
    res.sendFile('public/chat.html', {root:__dirname})

    // atencion
})

app.get('/holi', (req,res)=>{
    logger.log('info','gatos ')
    res.json('hola')
})

app.get('/debug', (req,res)=>{
    logger.log('debug','puta ')
    res.json('hola')
})

app.get('/win',(req,res)=>{
    logger.error('cometimo un error')
    res.json('hola')
})



httpServer.listen(PORT, ()=>{
    console.log('escuchando puerto '+PORT)
})

module.exports= io