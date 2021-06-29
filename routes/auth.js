/* Nos permite trabajar con mongo db */
const router = require('express').Router();
/* Requerimos a nuestro modelo de User */
const User = require('../app/models/User');
/* Nos permite hacer validaciones antes de agregar data */
const Joi = require('@hapi/joi');
/* Permite encriptar la contraseña */
const bcrypt = require('bcrypt');
/* Nos permite trabajar con JTW */
const jwt = require('jsonwebtoken');

/* En una variable declaramos todas las validaciones para nuestro esquema */
const schemaRegister = Joi.object({
    name: Joi.string().min(3).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required()
});

/* Definimos la ruta para registrar un nuevo usuario */
router.post('/register', async(req, res) => {

    // Validamos la data del usuario
    const { error } = schemaRegister.validate(req.body)

    /* Si los datos no cumplen las validaciones, regresamos los mensajes de las validaciones */
    if (error) {
        return res.status(400).json(
            {error: error.details[0].message}
        )
    }
    /* Verificar que se un email unico */
    const isEmailExist = await User.findOne({ email: req.body.email });
    if (isEmailExist) {
        return res.status(400).json(
            {error: 'Email ya registrado'}
        )
    }

    /* Encriptamos la contraseña */
    const saltos = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, saltos);

    /* Guardamos al usuario en un objeto del modelo User si cumple los requisitos */
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password
    });

    /* Preparamos un try por si hay un error */
    try{
        /* Guardamos al usuario en la DB */
        const userDB = await user.save();
        /* Devolvemos al usuarios guardado */
        res.json({
            error: null,
            data: userDB
        })

    /* En caso de que ocurra un error lo cachamos */
    }catch(error){
        /* Devolvemos el error con un estatus 400  */
        res.status(400).json(error);
    }

});

/* Se define las validaciones del esquema para el login de un usuario */
const schemaLogin = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(255).required()
})

/* Definimos la ruta para que los usuarios accedena al sistema */
router.post('/login', async(req, res) => {
    /* Verificamos que los datos del body pasen las validaciones */
    const { error } = schemaLogin.validate(req.body);
    /* En caso de que no pase, returnamos un mensaje con el tipo de error */
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    /* Buscamo si es que el email existe, si existe lo almancenamos en user */
    const user = await User.findOne({ email: req.body.email });
    /* En caso de que no exista returnamos un mensaje  */
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    /* Validamos que el password ingresado sea igual al del usuario, para eso los comparamos con bcrypt */
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    /* Sino es igual, le notificamos al usuario */
    if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })
    
    /* Creamos el token con la informacion para el usuario (payload)*/
    const token = jwt.sign({
        name: user.name,
        id: user._id
    }, process.env.TOKEN_SECRET)
    
    /* Devolvemos un mensaje de bienvenida con el token  */
    res.header('auth-token', token).json({
        error: null,
        data: {token}
    })
});

/* Exportamos estas rutas */
module.exports = router;