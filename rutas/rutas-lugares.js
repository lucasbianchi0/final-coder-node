const express= require('express')
const {Router} = express
const val_user = require('../middlewares/auth')
const {getControllerLugares,
    getControllerLugar,
    postControllerLugar,
    deleteControllerLugar,
    getControllerGuardar,
    deleteControllerAll}= require('../controlador/controlador-negocio')

const rutasLugares = Router()
rutasLugares.get('/guardar', getControllerGuardar)
rutasLugares.post('/guardar', postControllerLugar)
rutasLugares.get('/todos', getControllerLugares)
rutasLugares.get('/borrar/todos',deleteControllerAll)
rutasLugares.get('/:id', getControllerLugar)
rutasLugares.get('/borrar/:id', deleteControllerLugar)




module.exports= {rutasLugares}