const { generarJWT } = require('../helpers/generar-jwt');
const Alumno = require('../models/alumno');
const Profesor = require('../models/profesor');
const bcryptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password } = req.body;
    const alumno = await Alumno.findOne({ correo });
    const profesor = await Profesor.findOne({ correo });

    let user, userType;
    if(alumno){
        user = alumno;
        userType = 'alumno'
    } else{
        user = profesor;
        userType = 'profesor'
    }
    
    try {

        if (!user) {
            return res.status(400).json({
                msg: 'El correo No esta Registrado'
            })
        }

        if (!user.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'Constraseña incorrecta'
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Acceso concedido',
            message: (`Bienvenido ${user.nombre}`),
            message: (`Su rol actual es = ${user.role}`),
            token: (`Se le asigno un token = ${token}`)
        })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    login
}