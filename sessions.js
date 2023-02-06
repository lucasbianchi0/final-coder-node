const express= require('express')
const session = require('express-session');
const passport = require('passport');
const LocalStrategy= require('passport-local').Strategy
const {rutasLugares}= require('./rutas/rutas-lugares')
const {auth}= require('./middlewares/auth')
const bcrypt = require('bcrypt')
const Users= require('./modelo/modelo-usuario')
const envio_mensaje=require('./twilio')
const {Router}= express
const logger = require('./utils/logs')
const val_user= require('./middlewares/auth')

const rutasUsuarios= Router()

rutasUsuarios.use(session({
    secret:"secret",
    cookie:{
        httpOnly:true,
        secure:false,
        maxAge: 100* 60 * 60 * 24 *7
    },
    rolling: true,
    resave:false,
    saveUninitialized: false,
  }))

// const createHash = (password)=>{
//     const salt = bcrypt.genSaltSync(10)
//     return bcrypt.hashSync(password,salt ,null)
// }

const verifyPassword = (password, pass_crypt) => {
    return bcrypt.compare(password, pass_crypt)
}

// const val_user = (req,res,next)=>{
//     if (req.isAuthenticated()){
//         next()
//     }else{
//         res.redirect('/api/usuarios/login')
//     }
// }

passport.use('signup', new LocalStrategy({passReqToCallback:true},
    async (req, username, password, done)=> {
        const user= await  Users.findOne(
            { username: username,
            password:password
        })
        
        if(user){
            logger.log('info', 'el usuario ya existe')
            console.log('el usuario ya existe 1')
            done(null, false)
        }
        
        let nuevoUsuario = {
            username,
            password: password
        }
        const largo = (await Users.find()).length
        nuevoUsuario.id= largo + 1 
        // const usuario = new Users(nuevoUsuario)
        // usuario.password= await usuario.encryptPassword(password)
        // await usuario.save()

         const usuario = new Users(nuevoUsuario)
        // usuario.password= createHash(password)
        usuario.password=  bcrypt.hashSync(usuario.password,bcrypt.genSaltSync(10))
        await usuario.save()

        // const usuario = await new Users(nuevoUsuario).save
     
        logger.log('info','usuario creado')
        return done(null, usuario);
    }
));

passport.use('login', new LocalStrategy(
    async(username,password,done)=>{
        const user = await Users.findOne({username})
        console.log(user)
        if(!user){
            logger.log('info', 'usuario no existe')
            console.log('el usuario no existe')
            return done(null, false)
        }else{
            // const pass_crypt = user.password
            const match = verifyPassword(password,user.password)
            // const match =  bcrypt.compare(password, user.password)
            if(match){
                logger.log('info', 'usuario loggeado')
                return done(null, user)
            }
            done(null, false)
        }
       
      
}))

rutasUsuarios.use(passport.initialize());
rutasUsuarios.use(passport.session());

passport.serializeUser((user, done)=> {
    logger.log('info', 'usuario serializado')
    done(null, user); 
});

passport.deserializeUser( (id, done) =>{
    let user =  Users.find({id: id})
    logger.log('info', 'usuario deserializado')
    done(null, user);
    });

  
rutasUsuarios.post('/login', 
    passport.authenticate('login', { failureRedirect: '/login'}),
    async (req, res)=> {
    // req.session.user_data = req.body
    const {username, password}= req.body  
    const usuario = await Users.findOne({username:username})
    console.log(password)
    console.log('user: ' + usuario)
    console.log('user id:' +usuario.id)
    const match = bcrypt.compare(password,usuario.password)
    if(!match){
       console.log('not match')
    }
    const usuarioID= usuario.id
    console.log('usuarioID' +usuarioID)
    req.session.user_id = usuarioID
    console.log(req.session.user_id)
    res.redirect('/api/usuarios/home');
 
});

rutasUsuarios.post('/signup', 
    passport.authenticate('signup', { failureRedirect: '/signup', successRedirect: 'home' }))


rutasUsuarios.get('/signup', async (req,res)=>{
    res.render('signup')
})
rutasUsuarios.get('/login', async (req,res)=>{
    res.render('login')
})

rutasUsuarios.get('/home',val_user, async(req,res)=>{
    try{
    const usuarios = await Users.find()
    
    console.log(req.session.user_id)
    // console.log(usuario)
    logger.log('info','solicitan usuarios en pagina home' )
    res.json(usuarios)
    }catch(err){
        console.log(err)
        logger.log('error', 'error en peticion GET pagina home')
    }
})

rutasUsuarios.get('/user',val_user, async(req,res)=>{
    try{
        console.log(req.session.user_id)
        const id = req.session.user_id
        console.log(id)
        const user= await Users.find({id:id})
        const user_json=JSON.stringify(user)

        console.log(user)
        console.log(user_json)

        res.json(user_json) 
    }catch(err){
        console.log(err)
        logger.log('error', 'hubo un error')
    }
})

rutasUsuarios.get('/borrar',val_user, async(req,res)=>{
    try{
    console.log('hola')
    await Users.deleteMany()
    res.json('usuarios borrados')
    }catch(err){
        console.log(err)
        logger.log('error','error en peticion GET pagina borrar')
    }
})

rutasUsuarios.get('/contacto',val_user,(req,res)=>{  
    res.sendFile('public/contacto.html', {root:__dirname})
})

rutasUsuarios.post('/contacto',(req,res)=>{
    // const user_id= req.session.user_id 
    try{
        const { mensaje}= req.body
        console.log(mensaje)
        envio_mensaje(mensaje)
        res.json('form enviado a wsp conectado con twilio')
    }catch(err){
        console.log(err)
        logger.log('error', 'error en peticion POST en la pagina contacto')
    }
})

rutasUsuarios.get('/logout', (req,res,next)=>{
    req.logOut((err)=>{
        if(err){return next(err)}
        res.redirect('/api/usuarios/login')
    })
})

module.exports = {rutasUsuarios}