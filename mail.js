// let transporter = nodemailer.createTransport({
//     host: "smtp.ethereal.email",
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//       user: testAccount.user, // generated ethereal user
//       pass: testAccount.pass, // generated ethereal password
//     },
//   });

  // send mail with defined transport object
//   let info = await transporter.sendMail({
//     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     to: "bar@example.com, baz@example.com", // list of receivers
//     subject: "Hello ✔", // Subject line
//     text: "Hello world?", // plain text body
//     html: "<b>Hello world?</b>", // html body
//   });

const  { createTransport } = require("nodemailer");

const TEST_MAIL = 'lucmbianchi2000@gmail.com'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: TEST_MAIL,
        pass: 'kxxcmbdbggsofgab'
        // pass: 'HhXAfNRFRnQzhajyRC'
    }
});


const mailOptions = {
    from: 'Servidor Node.js',
    to: TEST_MAIL,
    subject: 'Mail de prueba desde Node.js',
    html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>',
    attachments: [
       {
        path:'https://images.hola.com/images/0279-161836c374b7-7a0d3c347208-1000/horizontal-1200/brad-pitt-series-4075.jpg'
       }]
 }
 

 ;(async()=>{
    try {
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
     } catch (error) {
        console.log(error)
     }
     
 })()