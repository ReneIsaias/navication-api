/* Nos permite trabajar y configurar nuestro servidor de manera sencilla */
const express = require('express');
/* Nos permite ver por consola las consultas */
const morgan = require('morgan');
/* Para obtener la informacion del proyecto */
const pkg = require('../package.json');


/* Nos permite trabajar con mongodb de manera facil y sencilla */
const mongoose = require('mongoose');
/* Nos permite obtener todo lo que nos envia el front en el body */
const bodyparser = require('body-parser');
/* La configuacion del dotenv(.env) que es el archivo que contiene nuestras configuraciones globales */
require('dotenv').config()

/* Asignamos una instancia de express a una variables */
const app = express();

/* Asignamos pkg a una variable por medio de express */
app.set('pkg', pkg);

/* Le decimos que use morgan en modo desarrollo */
app.use(morgan('dev'));

/* Iniciamos la rutas */
app.get('/', (req, res) => {
    /* Devolvemos la informacion de nuestro proyecto que esta en el package.json */
    res.json({
        "project": app.get('pkg').name,
        "author": app.get('pkg').author,
        "description": app.get('pkg').description,
        "version": app.get('pkg').version
    });
});

/* Exportamos app con toda la configuracion */
module.exports = app;