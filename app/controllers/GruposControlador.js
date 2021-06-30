const GrupoModel = require('../models/GrupoModel');

const crearGrupo = async (req, res) => {
    /* const {nombreGrupo, estado, creado} = req.body; */

    const nombregrupo = req.body.nombreGrupo;

    const newGrupo = new GrupoModel({nombreGrupo});

    const saveGrupo = await newGrupo.save();

    res.status(201).json(saveGrupo);
}

const obtenerGrupos = async (req, res) => {
    const grupos = await GrupoModel.find();

    res.json(grupos);
}

const obtenerGrupoPorId = async (req, res) => {
    const grupo = await GrupoModel.findById(req.params.grupoId);
    res.status(200).json(grupo);
}

const actualizarGrupoPorId = async (req, res) => {
    const actualizaGrupo = await GrupoModel.findByIdAndUpdated(req.params.grupoId, req.body, {
        new: true
    });

    res.status(200).json(actualizaGrupo);
}

const eliminarGrupoPorId = async (req, res) => {
    const {grupoId} = req.params;
    
    await GrupoModel.findByIdAndDelete(grupoId);

    res.status(204).json();
}

module.exports = {crearGrupo, obtenerGrupos, obtenerGrupoPorId, actualizarGrupoPorId, eliminarGrupoPorId}