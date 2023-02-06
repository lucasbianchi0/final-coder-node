

const val_user = (req,res,next)=>{
    if (req.isAuthenticated()){
        next()
    }else{
        res.redirect('/api/usuarios/login')
    }
}

module.exports= val_user