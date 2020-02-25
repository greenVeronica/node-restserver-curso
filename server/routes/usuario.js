const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');


app.get('/usuario', function(req, res) {
    //parametros opcionales
    let desde = req.query.desde || 0;
    desde = Number(desde); //lo convertimos viene string

    let limite = req.query.limite || 5;
    limite = Number(limite);

    //lista de todos los objetos
    Usuario.find({ estado: 'true' }, 'nombre email role estado google img') //seg parametro que campos muestro
        .skip(desde) //salte los primeros  5 
        .limit(limite) //muestra 5
        .exec(
            (error, usuarios) => {
                if (error) {
                    return res.status(400).json({
                        ok: false,
                        error
                    });

                };
                //si anduvo todo ok , trae todos los registros
                //contar usuarios
                //deberia recibir la misma condicion que el find
                Usuario.count({ estado: 'true' }, (error, conteo) => {
                    res.json({
                        ok: true,
                        usuarios, //no es necesario : usuarios: usuarios
                        //son los que trajo el find
                        cuantos: conteo
                    });
                });
            }); //fin del exec
});

app.post('/usuario', function(req, res) {
    //obtendremos los parametros
    let body = req.body; //esto se hace gracias al bodyParser

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });
    //impacto en la base, recibiremos un error  o un usuario impactado
    //en la base
    usuario.save((error, usuarioDB) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error

            });
        }
        //PRIMER OPCION
        //para no mandarlo en la respuesta
        //aunque este encriptado no se recomienda
        // usuarioDB.password = null;

        //segunda opcion es reescribiendo
        //usuarioSchema.methods.toJSON VER DEFINICION

        res.json({

            ok: true,
            usuario: usuarioDB
        });

    });


})


app.put('/usuario/:id', function(req, res) { //el parametro que espera es el id
    //obtenemos el parametro
    let id = req.params.id;
    /*let body = req.body;
    delete body.password;
    delete body.google;
    */
    //otra opcion 
    let body = _.pick(req.body,
        //propiedades validas 
        [
            'nombre',
            'email',
            'role',
            'estado'
        ])

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioDB) => {
        //podriamos borrar los campos que no queremos actualizar

        if (error) {
            return res.status(400).json({
                ok: false,
                error

            });
        }

        //res.json(`put Usuario ${id}`)
        res.json({
            ok: true,
            usuario: usuarioDB

        })

    })

})


app.delete('/usuario/:id', function(req, res) {
    //res.json('delete Usuario')
    let id = req.params.id;

    /*BORRADO FISICAMENTE DE LA BASE
    Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error

            });
        }

        //if (usuarioBorrado === null) {
        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                error,
                message: "usuario no encontrado"

            });
        }
        */
    /*Borrado actualizando el estado*/
    let body = { estado: 'false' }

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioBorrado) => {
        //podriamos borrar los campos que no queremos actualizar

        if (error) {
            return res.status(400).json({
                ok: false,
                error

            });
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado

        });


    });
})

module.exports = app;