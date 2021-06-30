/* Para trabajar con mongo db */
const mongoose = require('mongoose');

/* Definimos el esquema de nuestro modelo User */
const grupoSchema = mongoose.Schema({
    nombreGrupo: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    estado: {
        type: Boolean,
        default: true
    },
    creado: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('Grupo', grupoSchema);