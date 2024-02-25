const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');

const existenteAlumnoEmail = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`)
    }
}

const existenteProfesorEmail = async (correo = '') => {
    const existeEmail = await Profesor.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`)
    }
}

const existeAlumnoById = async ( id = '') => {
    const existeUsuario = await Alumno.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}
const existeProfesorById = async ( id = '') => {
    const existeUsuario = await Profesor.findOne({id});
    if(!existeUsuario){
        throw new Error(`El usuario con el ${ id } no existe`);
    }
}

module.exports = {
    existeProfesorById,
    existenteAlumnoEmail,
    existeAlumnoById,
    existenteProfesorEmail
}