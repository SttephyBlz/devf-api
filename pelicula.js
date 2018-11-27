const mongoose = require('mongoose');
const URL_MONGO = ''; //<conexion a mongo>;

mongoose.connect(URL_MONGO, { useNewUrlParser: true }, (err) => {
    if (!err) console.log('Conexion exitosa');
});


const Schema = mongoose.Schema;

const peliSchema = new Schema({
    titulo: String,
    anio: String,
    sinopsis: {
        type: String,

    },
    duracion: {
        type: Number,
        default: 90
    },
    genero: {
        type: String,
        enum: ['CO', 'DA', 'TE'],
        require: true
    },
    portadas_url: [String]
}, { timestamps: true });

const Pelicula = mongoose.model('Pelicula', peliSchema);

module.exports = { Pelicula };