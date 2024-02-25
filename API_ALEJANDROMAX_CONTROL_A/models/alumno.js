const { Schema, model} = require('mongoose');

const AlumnoSchema = Schema ({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    curso: [{
        type: String,
        require: [true, 'El curso es obligatorio']
    }],
    password: {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    role:{
        type: String,
        required: true,
        enum: ["TEACHER_ROLE", "STUDENT_ROLE"],
        default: "STUDENT_ROLE"
    },
    estado:{
        type: Boolean,
        default: true
    },
    google:{
        type: Boolean,
        default: false
    }
});

/*AlumnoSchema.methods.toJSON = function(){
    const { __v, password, _id, ...alumno} = this.toObject();
    alumno.uid = _id;
    return alumno;
}*/

module.exports = model('Alumno', AlumnoSchema);