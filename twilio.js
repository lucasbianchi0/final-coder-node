const twilio = require('twilio')

const accountSid = 'AC6f9d4c1a205be830414edbd74f610cae'
const authToken = '569acefd38afb5dd42e910b435f1620c';

const client = require('twilio')(accountSid, authToken);

const envio_mensaje = (mensaje)=>{

      console.log(mensaje)
      const options = {
      body: mensaje,
      //     mediaUrl: [ 'https://www.chetu.com/img/twilio/partner/twilio-logo.png' ],
      from: 'whatsapp:+14155238886',  
      to: 'whatsapp:+5491124571928'
      }

      client.messages
            .create(options)
            .then(message => console.log(message.sid));

      console.log(options)
}

module.exports= envio_mensaje