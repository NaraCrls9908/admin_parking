// Instancias para correr el proyecto
const express = require('express');
const port = 3000
const app = express();


// Rutas de los diferentes metodos
// Ruta obtener toda la información de los parking
app.get('/', (req, res)=> {
    res.send("hola");
});


app.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})