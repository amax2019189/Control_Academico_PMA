const { response, query } = require('express');
const bcryptjs = require('bcryptjs');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const Curso = require('../models/cursos');
const { existeCursosNombre, validarExistenciaProfesor } = require('../helpers/db-validators');

const cursoPost = async (req, res) => {
    try {
        const { nombre, descripcion, curso } = req.body;
        const profesor = req.profesor._id;
        const cursos = new Curso({ nombre, descripcion, curso, profesor});

        await cursos.save();
        res.status(200).json({
            cursos
        });
    } catch(e) {
        res.status(409).json({
            error: e.message
        })
    }
}

const cursoGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: "Habilitado" };
    const [total, curso] = await Promise.all([
        Curso.countDocuments(query),
        Curso.find(query)
            .populate('profesor', 'nombre correo')
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        curso
    });
}

const cursoProfesorGet = async (req, res) => {
    try {
        const profesorId = req.profesor._id;

        const curso = await Curso.find({ profesor: profesorId });

        res.status(200).json({
            total: curso.length,
            curso
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al obtener cursos del profesor",
            error: error.message
        });
    }
}

const cursoPut = async (req, res) => {
    try {
        const { id } = req.params;
        const { profesor: profesorAutenticado } = req;
        const { _id, acceso, profesor, ...resto } = req.body;

        const curso = await Curso.findById(id);

        if (!curso || String(curso.profesor) !== String(profesorAutenticado._id)) {
            return res.status(403).json({
                msg: 'Acceso no autorizado. Solo el profesor propietario puede actualizar este curso.',
            });
        }

        const cursoActualizado = await Curso.findByIdAndUpdate(id, resto, { new: true });

        await Alumno.updateMany(
            { curso: { $in: [cursoActualizado._id] } },
            { $set: { "cursos.$": cursoActualizado._id } }
        );

        res.status(200).json({
            msg: 'Curso actualizado exitosamente',
            curso: cursoActualizado
        });
    } catch (error) {
        res.status(500).json({
            msg: "Error al actualizar el curso",
            error: error.message
        });
    }
}

const cursoDelete = async (req, res) => {
    try {
        const { id } = req.params;
        const { profesor } = req;

        const curso = await Curso.findById(id);

        if (!curso || curso.profesor.toString() !== profesor._id.toString()) {
            return res.status(403).json({
                msg: 'Acceso no autorizado. Solo el profesor propietario puede actualizar este curso.',
            });
        }

        await Alumno.updateMany(
            { cursos: curso._id },
            { $pull: { cursos: curso._id } }
        );

        await Curso.findByIdAndUpdate(id, { estado: false });

        res.status(200).json({
            msg: 'Curso eliminado exitosamente',
        });
    } catch (error) {
        res.status(500).json({
            msg: 'Error al eliminar el curso',
            error: error.message,
        });
    }
}

module.exports = {
    cursoPost,
    cursoGet,
    cursoProfesorGet,
    cursoPut,
    cursoDelete
}