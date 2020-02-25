//se encargara de trabajar con el modelo de datos
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;
//definimos la enumeracion valida de roles
let rolesValidos = {
    values: ['ADMNI_ROLE', 'USER_ROLE'],
    message: '{VALUE} , no es un rol valido'
}

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER-ROLE',
        enum: rolesValidos //indico lista de los roles permitidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});
// se puede reescribir el metodo .Tojson
// para no devolver el password
//el metodo tojson siempre se llama al querer imprimir el esquema

//para usar el pluguin unique-mongoose-validator
usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    //ahora si se puede borrar una propiedad
    delete userObject.password;
    return userObject;

};


usuarioSchema.plugin(uniqueValidator, {
    message: '{PATH} debe de ser unico'
});

//se creara fisicamente en la base mongoose la tabla usuario
//con el esquema usuarioShema
module.exports = mongoose.model('Usuario', usuarioSchema);