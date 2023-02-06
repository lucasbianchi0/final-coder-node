const {transports,format, createLogger} = require('winston')

module.exports = createLogger({
    level:'warm',
    transports: [
        // new transports.File({
        //     name: 'error-file',
        //     filename:__dirname+'error.log',
        //     level:'error'
        // }),
        new (transports.File)({ 
            filename: 'utils/error.log',
            level: 'error', 
            format:format.combine(format.simple())}),

        new transports.Console(
        {
            level: 'debug',
            format:format.combine(format.simple())}
        ,
        {
            level: 'info', 
            format:format.combine(format.simple())
        })
       

      
        
        
       
        
    ]
})

