/* Nos permite trabajar y configurar nuestro servidor de manera sencilla */
const express = require('express');
/* Nos permite trabajar con mongodb de manera facil y sencilla */
const mongoose = require('mongoose');
/* Nos permite obtener todo lo que nos envia el front en el body */
const bodyparser = require('body-parser');
/* La configuacion del dotenv(.env) que es el archivo que contiene nuestras configuraciones globales */
require('dotenv').config()

/* asignamos un variable para configurar el servidor */
const app = express();

// cors
const cors = require('cors');
var corsOptions = {
    origin: '*', // Reemplazar con dominio
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}
app.use(cors(corsOptions));

/* Configuramos a body para capturar todo lo que venga del body */
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

/* Conexion a la base de datos */
/* colocamos la url de conexión local y el nombre de la base de datos */
const uri = 'mongodb://localhost:27017/api-rest-navication';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Conexión a la base de datos correctamente'))
.catch(e => console.log('Error al conectar a la base de datos:', e));

/* Importamos las rutas */
const authRoutes = require('./routes/auth');
const validaToken = require('./app/middlewares/validate-token');
const admin = require('./routes/admin');

// route middlewares
app.use('/api/users', authRoutes);

app.use('/api/admin', validaToken, admin);

app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// Iniciamos nuestro servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
});