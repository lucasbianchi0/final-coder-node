

const server= io().connect()


const nombreChat = document.querySelector('#nombre-chat')

     axios.get('http://localhost:8080/api/usuarios/user')
    .then(response => {
        console.log(response.data);
        console.log( JSON.parse(response.data))
       const user = JSON.parse(response.data)
       const userName= user[0].username
       console.log(userName)
       nombreChat.innerHTML= `${userName}`
  
    })
    .catch(err => {
        console.error(err);
    })



const button = document.querySelector('#boton')

button.addEventListener('click',()=>{

    const mensaje = document.querySelector('#mensaje').value
    console.log(mensaje)
    const mensaje_enviado ={
        mensaje
    }
    server.emit('envio_mensaje', mensaje_enviado)
console.log(mensaje_enviado)
})

server.on('mensajes', info=>{
    
     axios.get('http://localhost:8080/api/usuarios/user')
    .then(response => {
        console.log(response.data);
        console.log( JSON.parse(response.data))
        const user = JSON.parse(response.data)
        const userName= user[0].username

        console.log(userName)
        

        const mensajes = document.querySelector('#mensajes')
  
        const html = info.map(mensaje=>{
        return ` <p>${userName}</p>

        <p>${mensaje.mensaje}</p>
        <br>`
    })
   
    mensajes.innerHTML=html.join(' ')
    
    })
    .catch(err => {
        console.error(err);
    })

})
