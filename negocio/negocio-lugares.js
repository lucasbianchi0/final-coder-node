const {  ver_datos,
    ver_dato,
    eliminar_datos,
    eliminar_dato,
    guardar_dato, } = require("../persistencia/persistencia-lugares")


const obtener_lugares= async (lugares)=>{
    return await ver_datos(lugares)
}

const obtener_lugar= async (lugar)=>{
    return await ver_dato(lugar)
}

const borrar_lugares= async(lugares)=>{
    return await eliminar_datos(lugares)
}

const borrar_lugar= async(lugarID)=>{
    return await eliminar_dato(lugarID)
}

const guardar_lugar= async(producto,precio)=>{
    const lugar = {
        nombre:producto,
        precio:precio
    }
    return await guardar_dato(lugar)

}

module.exports={
    obtener_lugares,
    obtener_lugar,
    borrar_lugares,
    borrar_lugar,
    guardar_lugar
}