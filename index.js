const express = require('express');
const bodyParser = require('body-parser');
const { Pelicula } = require('./pelicula');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({ message: 'Server On C:' })
});

app.post('/create/pelicula', (req, res) => {
    const { titulo, anio, sinopsis, genero, portadas_url } = req.body;
    const newPelicula = Pelicula({
        titulo,
        anio,
        sinopsis,
        genero,
        portadas_url
    });
    newPelicula.save((err, pelicula) => {
        err
            ? res.status(409).send(err)
            : res.send(pelicula);
    });
});

app.get('/all/peliculas', (req, res) => {
    Pelicula.find().exec()
        .then(peliculas => res.send(peliculas))
        .catch(err => res.send(err));
});

app.get('/pelicula/:id', (req, res) => {
    const { id } = req.params;
    Pelicula.findById(id).exec()
        .then(pelicula => pelicula ? res.send(pelicula) : res.status(404).send({ message: 'No se encontró' }))
        .catch(err => res.status(409).send(err));
});

app.put('/pelicula/:id', (req, res) => {
    const { id } = req.params;
    Pelicula.findByIdAndUpdate(id, { $set: req.body }, { new: true }).exec()
        .then(pelicula => res.send(pelicula))
        .catch(err => res.status(409).send(err));
});

app.delete('/pelicula/:id', (req, res) => {
    const { id } = req.params;
    Pelicula.findByIdAndDelete(id).exec()
        .then(pelicula => res.send(pelicula))
        .catch(err => res.status(409).send(err));
});

app.listen(3000, () => {
    console.log(`server on port ${3000}`);
});