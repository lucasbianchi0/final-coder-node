const mongoose= require('mongoose')

const lugaresShema= new mongoose.Schema({

    id:{
        type: Number,
        required:true
    },
    nombre:{
        type: String,
        required:true
    },
    precio:{
        type: Number,
        required:true
    }
})

module.exports= mongoose.model('Lugares', lugaresShema)