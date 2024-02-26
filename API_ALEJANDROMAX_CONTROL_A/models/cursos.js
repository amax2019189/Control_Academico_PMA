const { Schema, model } = require('mongoose');

const CursoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    descripcion: {
        type: String,
        required: [true, 'La descripción es obligatorio']
    },
    curso: {
        type: String,
        required: [true, 'El curso es obligatorio']
    },
    token: {
        type: Schema.Types.ObjectId,
        ref: 'Profesor',
        require: [true, 'El token es necesario']
    },
    estado: {
        type: String,
        default: "Habilitado"
    }
});

module.exports = model('Curso', CursoSchema);