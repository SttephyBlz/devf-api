const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.get('/', (request, response, next) => {
    response.send({ message: 'hola.' });
});

app.get('/home', (request, response, next) => {
    response.send({ message: 'Mensaje desde home.'});
});

//http://localhost:3001/users/123
app.get('/users/:id', (request, response, next) => {
    // const id = req.params.id
    const { id } = request.params; //son lo mismo siempre y cuando se llamen igual destructuración de datos o.o

    response.send({ message: `Id buscado: ${id}` });
});

//http://localhost:3001/search?query=asd&a=asdasd&b=34
app.get('/search', (request, response, next) => {

    const { query, a, b } = request.query;

    response.send({ query, a, b });
});

app.post('/users', (request, response, next) => {

    const { name, age, job } = request.body;
    
    response.status(201).send({ id: '1', name, age, job });
});

app.patch('/users', (request, response, next) => {
    const { name, age, job } = request.body;
    
    response.send({ name, age, job });
});


/*

1.- Crear un endpoint para obtener 
el area de un triangulo por medio de 
los params
2.- Crear un endpoint para obtener 
el area de un triangulo por medio de 
los query
3.- Crear un endpoint para obtener 
el area de un triangulo por medio del body

4.- Crear un endpoint para obtener 
el area de un rectangulo por medio de 
los params
5.- Crear un endpoint para obtener 
el area de un rectangulo por medio de 
los query
6.- Crear un enppoint para obtener 
el area de un rectangulo por medio del body

*/

app.get('/triangulo/:lado/:altura', (request, response, next) => {
    const { lado, altura } = request.params; 

    response.send({ message: `Área: ${(lado*altura)/2}` });
});

app.get('/triangulo', (request, response, next) => {
    const { lado, altura } = request.query; 

    response.send({ message: `Área: ${(lado*altura)/2}` });
});

app.post('/triangulo', (request, response, next) => {

    const { lado, altura } = request.body;
    
    response.status(201).send({ area: ((lado*altura)/2) });
});

app.get('/rectangulo/:lado/:altura', (request, response, next) => {
    const { lado, altura } = request.params; 

    response.send({ message: `Área: ${lado*altura}` });
});

app.get('/rectangulo', (request, response, next) => {
    const { lado, altura } = request.query; 

    response.send({ message: `Área: ${lado*altura}` });
});

app.post('/rectangulo', (request, response, next) => {

    const { lado, altura } = request.body;
    
    response.status(201).send({ area: (lado*altura) });
});

app.listen(3001, () => {
    console.log('Server on port 3001.');    
});