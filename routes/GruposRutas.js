const router = require('express').Router();
/* Importamos los controladores */
const grupoControlador = require('../app/controllers/GruposControlador');

router.post('/grupos', grupoControlador.crearGrupo);

router.get('/grupos', grupoControlador.obtenerGrupos);

router.get('/grupos/:grupoId', grupoControlador.obtenerGrupoPorId);

router.put('/grupos/:grupoId', grupoControlador.actualizarGrupoPorId);

router.delete('/grupos/:grupoId', grupoControlador.eliminarGrupoPorId);

module.exports = router;