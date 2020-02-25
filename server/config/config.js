//=============================
// Puerto
//=============================
//process.env.PORT LOCALMENTE NO EXISTE
process.env.PORT = process.env.PORT || 3000;

//=============================
// Entorno
//=============================
//process.env.NODE_ENV esta variable lo define heroku
//si no existe la variable definimos que estamos en desa dev
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//=============================
// base de datos
//=============================
let urlDB;
if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://vgreen:1I1lAiSFBRii3Ssb@cluster0-zvstw.mongodb.net/cafe';


}

process.env.urlDB = urlDB; //process.env.urlDB la creamos para usarla