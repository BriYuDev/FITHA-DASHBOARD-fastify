const init = require('./app.js')

init().listen({ port: 3000, host: "0.0.0.0" } , (err) => {
    if(err){
        console.error(err)
        process.exit(1)
    } 
})
