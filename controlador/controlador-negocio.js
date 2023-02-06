
const {obtener_lugar,obtener_lugares,borrar_lugar, borrar_lugares, guardar_lugar}= require('../negocio/negocio-lugares')

const getControllerLugares = async(req,res)=>{
    const lugares = await obtener_lugares()
    res.json(lugares)
}

const getControllerLugar = async(req,res)=>{
    const {id} =req.params
    const lugar = await obtener_lugar(id)
    res.json(lugar)
}

const postControllerLugar = async(req,res)=>{
    console.log('hola')
    const {producto,precio}= req.body
    console.log('el producto '+ producto)
    const producto_guardado=await guardar_lugar(producto,precio)
    res.json(producto_guardado)
}
const getControllerGuardar = (req,res)=>{
    console.log(__dirname)
    // res.json('hola')
    res.sendFile('/guardar.html',{root:'public'})
}


const deleteControllerLugar = async (req,res)=>{
    const {id}=req.params
    const lugar_borrado= await borrar_lugar(id)
    res.json(lugar_borrado)
}
const deleteControllerAll = async (req,res)=>{
    const lugares_borrado= await borrar_lugares()
    res.json(lugares_borrado)
}



module.exports={ getControllerLugares,
    getControllerLugar,
    postControllerLugar,
    deleteControllerLugar,
    getControllerGuardar,
    deleteControllerAll}

