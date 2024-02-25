const  { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');

const profesorPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const profesor = new Profesor({nombre, correo, password });

    const salt = bcryptjs.genSaltSync();

    await profesor.save();
    res.status(200).json({
        profesor
    });
}

module.exports = {
    profesorPost
}