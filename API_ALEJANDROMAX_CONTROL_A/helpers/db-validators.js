const Alumno = require('../models/alumno');
const Role = require('../models/role');

const existenteEmail = async (correo = '') => {
    const existeEmail = await Alumno.findOne({correo});
    if(existeEmail){
        throw new Error(`El email ${ correo } ya fue registrado`);
    }
}

const esRolValido = async (role='') => {
    const existeRol = await Role.findOne({role});

    if(!existeRol){
        throw new Error(`El role ${ role } no existe en base de datos.` )
    }
}

const existeAlumnoById = async ( id = '') => {
    const existeAlumno = await Alumno.findOne({id});
    if(existeAlumno){
        throw new Error(`El alumno con el ${ id } no existe`);
    }
}

module.exports = {
    existenteEmail,
    esRolValido,
    existeAlumnoById
}