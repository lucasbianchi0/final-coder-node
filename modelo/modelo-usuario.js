const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const usuarioSchema = mongoose.Schema({

    username:{
        type:String,
        required: true
    } ,
    password:{
        type:String,
        required:true
    },
    id:{
        type:Number,
        required:true
    }
})

// usuarioSchema.methods.encryptPassword= async(password)=>{
//     const salt = await bcrypt.genSalt(10)
//     return await bcrypt.hash(password,salt )
// }

// usuarioSchema.methods.matchPassword= async(password, pass_crypt)=>{
//     console.log('l;egue')
//     const validation = await bcrypt.compare(password, pass_crypt)
//     return validation
// }


module.exports=mongoose.model('Users', usuarioSchema)