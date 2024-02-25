const { Router } = require('express');
const { check } = require('express-validator');

const { existenteEmail, existenteAlumnoEmail } = require('../helpers/db-validators');
const { alumnoPost, alumnoPut, alumnoDelete } = require('../controllers/alumno.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existeAlumnoById } = require('../helpers/db-validators');
const { model } = require('mongoose');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("correo","El correo es obligatoria").isEmail(),
        check("correo").custom(existenteAlumnoEmail),
        check("password","Password es necesario"),
        validarCampos
    ], alumnoPost);

router.put(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnoPut);

router.delete(
    "/:id",
    [
        check("id","El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeAlumnoById),
        validarCampos
    ], alumnoDelete);

module.exports = router;