require('./config/config'); //deberia ser el primer archivo , para que al iniciar configure lo que esta adentro primero 
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())



app.get('/usuario', function(req, res) {
    res.json('get Usuario')
})

app.post('/usuario', function(req, res) {
    //obtendremos los parametros
    let body = req.body; //esto se hace gracias al bodyParser
    //validaciones
    if (body.nombre === undefined) {
        //en el caso que no exista mando un codigo de status
        res.status(400).json({
            ok: false,
            mensaje: "el nombre es obligatorio",

        });

    } else {

        res.json({ persona: body });
    }
})


app.put('/usuario/:id', function(req, res) { //el parametro que espera es el id
    //obtenemos el parametro
    let id = req.params.id;
    //res.json(`put Usuario ${id}`)
    res.json({ id })

})


app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
})



app.listen(process.env.PORT, () => {
    console.log("escuchando puerto ", process.env.PORT);
})