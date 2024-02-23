const { generarJWT } = require("../helpers/generar-jwt");
const Alumno = require("../models/alumno");
const Profesor = require("../models/profesor");
const bycriptjs = require('bcryptjs');

const login = async (req, res) => {
    const { correo, password} = req.body;
    const alumno = await Alumno.findOne({ correo });
    const profesor = await Profesor.findOne({ correo });

    let user, userType;
    if(alumno){
        user = alumno;
        userType = "alumno"
    } else{
        user = profesor;
        userType = "profesor"
    }

    try{

        console.log(user)
        if(!user){
            return res.status(400).json({
                msg: 'El correo no está registrado'
            })
        }

        if(!user.estado){
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            })
        }

        const validPassword = bycriptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Contraseña incorrecta'
            })
        }

        const token = await generarJWT(user.id);

        res.status(200).json({
            msg: 'Login ok',
            user,
            token
        });

    }catch(e){
        console.log(e);
        res.status(500).json({
            msg: 'Comuniquese con el admin'
        })
    }
}

module.exports = {
    login
};