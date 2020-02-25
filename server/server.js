require('./config/config'); //deberia ser el primer archivo , para que al iniciar configure lo que esta adentro primero 
const express = require('express')
const mongoose = require('mongoose');

const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))


// parse application/json
app.use(bodyParser.json())

app.use(require('./routes/usuario'));


//estableciendo la conexion de datos
//en la libreria recomendaba usar await



mongoose.connect(process.env.urlDB, {
    //mongodb://localhost/my_database 
    //mongodb es el protocolo 
    //
    useNewUrlParser: true,
    useUnifiedTopology: true,

    useFindAndModify: false,
    useCreateIndex: true

}, (err, res) => {
    //para evaluar si pudo conectarse o no
    if (err) throw new error;
    console.log("base de datos ONLINE");


});

app.listen(process.env.PORT, () => {
    console.log("escuchando puerto ", process.env.PORT);
})