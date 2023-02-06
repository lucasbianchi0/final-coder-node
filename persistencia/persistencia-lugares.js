const Lugares = require('../modelo/modelo-lugares')
const logger = require('../utils/logs')


const ver_datos= async(lugares)=>{
    try{
        return await Lugares.find()
    }catch(err){
        logger.log('error', 'error en persistencia de ver datos')
        console.log(err)
    }
}

const ver_dato= async(lugarID)=>{
    try{
        const lugares = await Lugares.find({id:lugarID})
        return (lugares)
    }catch(err){
        logger.log('error', 'error en persistencia de ver dato')
        console.log(err)
    }
}

const eliminar_datos = async(lugares)=>{
    try{
        const existe = await Lugares.find()
    if(existe){
        const lugares_eliminado = await Lugares.deleteMany()
        return ({mensaje:'se eliminaron los datos'})
    }
    return ({mensaje: 'no existen productos'})
    }catch(err){
    logger.log('error', 'error en persistencia de eliminar datos')
    console.log(err)
}

}

const eliminar_dato= async(lugarID)=>{
    try{
        const existe = await Lugares.findOne({id: lugarID})
    console.log(existe)
    if(existe){
        const lugar_eliminado = await Lugares.deleteOne({id: lugarID})
        return({mensaje:'se elimino el articulo'})
    }
    return({mensaje:'no existe el producto'})
    }catch(err){
        logger.log('error', 'error en persistencia de eliminar dato')
        console.log(err)
    }
    
}

const guardar_dato= async (lugar)=>{
    try{
        const largo =  (await Lugares.find()).length
        lugar.id = largo +1
        console.log(lugar.id)
        console.log(lugar)
        const lugar_guardado = await new Lugares({nombre:lugar.nombre, precio:lugar.precio, id:lugar.id}).save()
        return ({mensaje: 'se guardo el lugar '+ lugar_guardado})
    }catch(err){
        logger.log('error', 'error en persistencia de guardar dato')
        console.log(err)
    }
}

module.exports={
    ver_datos,
    ver_dato,
    eliminar_datos,
    eliminar_dato,
    guardar_dato,
}
