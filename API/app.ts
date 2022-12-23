
import { privateDecrypt } from "crypto";

// Instancias para correr el proyecto
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { clearScreenDown } from "readline";

dotenv.config();


const port = 3000
const app = express();

interface parking {
    address: String,
    ammenities: String[],
    score: Number,
    price: Number,
    type: String,
    images: String[],
    description: String
}

var parking1: parking = {
    address: 'direccion 1',
    ammenities: ['una', 'dos'],
    score: 4,
    price: 124,
    type: 'publico',
    images: ['foto1', 'foto2', 'foto3'],
    description: 'is a nice parking'
}



// Rutas de los diferentes metodos
// Ruta obtener toda la información de los parking
app.get('/', (req, res)=> {
    res.send(parking1);
    console.log(parking1);
});


app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`)
})