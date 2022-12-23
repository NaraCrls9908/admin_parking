"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Instancias para correr el proyecto
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const port = 3000;
const app = (0, express_1.default)();
var parking1 = {
    address: 'direccion 1',
    ammenities: ['una', 'dos'],
    score: 4,
    price: 124,
    type: 'publico',
    images: ['foto1', 'foto2', 'foto3'],
    description: 'is a nice parking'
};
// Rutas de los diferentes metodos
// Ruta obtener toda la información de los parking
app.get('/', (req, res) => {
    res.send(parking1);
    console.log(parking1);
});
app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`);
});
