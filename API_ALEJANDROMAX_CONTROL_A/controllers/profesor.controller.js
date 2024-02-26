const  { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Profesor = require('../models/profesor');

const profesorPost = async (req, res) => {
    const { nombre, correo, password } = req.body;
    const profesor = new Profesor({nombre, correo, password });

    const salt = bcryptjs.genSaltSync();
    profesor.password = bcryptjs.hashSync(password, salt);

    await profesor.save();
    res.status(200).json({
        profesor
    });
}

const getProfesorByid = async (req, res) => {
    const { id } = req.params;
    const profesor = await Profesor.findOne({ _id: id });

    res.status(200).json({
        msg: "Profesor Encontrado",
        profesor
    });
}

const profesoresGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, profesores] = await Promise.all([
        Profesor.countDocuments(query),
        Profesor.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        profesores
    });
}

const profesoresPut = async (req, res) => {

    const { id } = req.params;
    const { _id, password, google, office, correo, ...resto } = req.body;

        await Profesor.findByIdAndUpdate(id, resto);
        const profesor = await Profesor.findOne({ _id: id });

        res.status(200).json({
            msg: "Profesor actualizado Exitosamente",
            profesor
        }); 
}

const profesoresDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const profesor = await Profesor.findByIdAndUpdate(id, { estado: false });
        const profesorAutenticado = req.profesor;
        res.status(200).json({
            msg: "Profesor a eliminar",
            profesor,
            profesorAutenticado
        });
    } catch (error) {
        res.status(500).json({
            msg: "Profesor no se elimino"
        });
    }

}

module.exports = {
    profesorPost,
    getProfesorByid,
    profesoresGet,
    profesoresPut,
    profesoresDelete
}