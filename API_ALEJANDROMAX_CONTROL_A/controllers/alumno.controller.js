const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');

const alumnoPost = async (req, res) => {
    const { nombre, correo, password} = req.body;
    const alumno = new Alumno({nombre, correo, password });

    const salt = bcryptjs.genSaltSync();

    await alumno.save();
    res.status(200).json({
        alumno
    });
}

const alumnoPut = async (req, res) => {
    const { id } = req.params;
    const { _id, correo, ...resto} =req.body;
    
    const alumno = await Alumno.findByIdAndUpdate(id, resto);

    res.status(200).json({
        msg: 'Alumno Actualizado exitosamente'
    });
}

const alumnoDelete = async (req, res) => {
    const {id} = req.params;
    const alumno = await Alumno.findByIdAndUpdate(id,{estado: false});

    res.status(200).json({
        msg: 'Alumno Eliminado Exitosamente'
    });
}

module.exports = {
    alumnoPost,
    alumnoPut,
    alumnoDelete
}