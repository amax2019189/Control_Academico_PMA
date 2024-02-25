const jwt = require("jsonwebtoken");
const Profesor = require("../models/profesor");
const Alumno = require("../models/alumno");

const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
      return res.status(401).json({
          msg: 'No hay token'
      })
  }

  try {

      const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
      const profesor = await Profesor.findById(uid);
      const alumno = await Alumno.findById(uid);

      if(profesor){
          if (!profesor) {
              return res.status(400).json({
                  msg: 'El profesor no existe'
              });
          }
          if (!profesor.estado) {
              return res.status(401).json({
                  msg: 'Token no valido, profesor con estado: false'
              })
          }
          if (profesor) {
              req.profesor = profesor;
              req.correo = profesor.correo;
          }
      }else{
          if (!alumno) {
              return res.status(400).json({
                  msg: 'El alumno no existe'
              });
          }
          if (!alumno.estado) {
              return res.status(401).json({
                  msg: 'Token no valido, alumno con estado: false'
              })
          }
          if (alumno) {
              req.alumno = alumno;
          }
      }
      next();
  } catch (error) {

      console.log(error);
      return res.status(401).json({
          msg: 'Token no valido'
      })
  }
}

module.exports = {
  validarJWT
}