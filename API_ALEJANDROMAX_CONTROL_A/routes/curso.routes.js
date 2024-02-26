const { Router } = require('express');
const { check } = require('express-validator');

const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeCursoById } = require('../helpers/db-validators');
const { cursoPost, cursoProfesorGet, cursoGet, cursoPut, cursoDelete } = require('../controllers/cursos.controller');
const validarProfesor = require('../middlewares/validar-profesor');

const router = Router();
router.get("/", cursoGet);

router.post(
    "/",
    [
        validarJWT,
        check("nombre","El nombre es obligatorio").not().isEmpty(),
        check("descripcion","La descripcion es obligatoria"),
        validarCampos
    ], cursoPost);

    router.post(
        "/profesor",
        [
            validarJWT,
            check("correo", "El correo del profesor es obligatorio").isEmail(),
            validarCampos
        ], cursoProfesorGet);

router.put(
    "/:id",
    [
        validarJWT,
        validarProfesor,
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoPut);

router.delete(
    "/:id",
    [
        validarJWT,
        validarProfesor,
        check("id", "El id no es un formato valido de MongoDB").isMongoId(),
        check("id").custom(existeCursoById),
        validarCampos
    ], cursoDelete);

module.exports = router;