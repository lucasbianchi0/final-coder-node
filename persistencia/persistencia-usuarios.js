const {Users} = require('../modelo/modelo-usuario')

const ver_usuarios= async(usuarios)=>{
   const usuarios= await Users.find()
   console.log(usuarios)
}

const ver_usuario= async(usuarioID)=>{
   const usuario_filtrado =  await Users.find({id:usuarioID})
   console.log(usuario_filtrado)
}

const eliminar_usuario = async(usuarioID)=>{
    const usuario_eliminado = await Users.deleteOne({id: usuarioID})
    console.log(usuario_eliminado)
}

const guardar_usuario= async (usuario)=>{
    const usuario_guardado = new Users({usuario}).save()
    console.log(usuario_guardado)
}

module.exports={
    ver_usuarios,
    ver_usuario,
    eliminar_usuario,
    guardar_usuario,
}
