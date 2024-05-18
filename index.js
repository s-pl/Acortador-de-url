const express = require('express');
const app = express();
const port = 3000


const urlRouter = require('./routes/urlRouter')
const getRouter = require('./routes/getRouter')
const infoUrlRouter = require('./routes/infoUrlRouter')


app.use(express.json())
app.use('/', urlRouter)
app.use('/', getRouter)
app.use('/', infoUrlRouter)


app.get('/', function(req,res){
    res.sendFile(__dirname + "/public/index.html")
})
app.get('*', function(req,res){
    res.status(404).json({
        "error":"¿Estás perdido? Por aquí no hay nada.."
    })
})


app.listen(port, function(){
console.log("servidor iniciado en el puerto " + port)
});







