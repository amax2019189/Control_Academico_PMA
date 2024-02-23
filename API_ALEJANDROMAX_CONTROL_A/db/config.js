const mongoose = require('mongoose');
const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{});
        console.log('Base de datos conectada Exitosamente');
    } catch (errores) {
        throw new console.error('Error al conectar a la base de datos');
    }
}

module.exports = {
    dbConnection
}