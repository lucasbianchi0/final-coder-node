const mongoose = require('mongoose')

const connectDB = async ()=>{
    try{
        DB_URI= 'mongodb+srv://luki-project:EKeZBffswBXje7gF@cluster0.fdqdutk.mongodb.net/?retryWrites=true&w=majority'
        await mongoose.set('strictQuery',false);
        await mongoose.connect(DB_URI,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    })
    console.log('mongo conectado')
    }catch(err){
        console.log(err)
    }
}

module.exports= {connectDB}