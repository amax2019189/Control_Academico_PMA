const { Router } = require('express');
const { check } = require('express-validator');

const { profesorPost } = require('../controllers/profesor.controller');
const { validarCampos } = require('../middlewares/validar-campos')
const { existenteEmail } = require('../helpers/db-validators');
const { model } = require('mongoose');

const router = Router();

router.post(
    "/",
    [
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("correo","La especie es obligatorio"),
        check("curso","El curso es necesario"),
        check("password","Password es necesario"),
        check("curso").custom(existenteEmail),
        validarCampos
    ], profesorPost);

module.exports = router;