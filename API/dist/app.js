// Instancias para correr el proyecto
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const port = 8080;
const app = express();
app.use(express.json());
app.use(cors());
let parkings = [
    {
        address: 'Street A #35, California, CA,',
        ammenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Battery-shaped places'],
        score: 3.8,
        price: 100,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'Cheap & nice parking with surveillance cameras. Parking on Ground floor'
    },
    {
        address: 'Street B #27, California, CA',
        ammenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Parking with ceiling'],
        score: 4.2,
        price: 175,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High security parking for those who are looking for his safety.'
    },
    {
        address: 'Street C #7, California, CA',
        ammenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Parking with ceiling', 'Private Parking Lot'],
        score: 4.8,
        price: 200,
        type: 'Private',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High luxury and security parking. Private parking with surveillance cameras, private parking for your car, aditionali we can wash your car.'
    }
];
// Is my API working?
app.get('/', (req, res) => {
    res.send("Hi! I'm your API and I'm working");
});
// Routes for parkings
// Get all parkings
app.get('/parkings', (req, res) => {
    res.send(parkings);
});
// Create parking
app.post('/parkings/add', (req, res) => {
    console.log("body de la req: ", req.body);
    addParking(req.body);
    res.send(parkings);
});
// Delete parking
app.delete('/parkings/delete/:id', (req, res) => {
    let id = parseInt(req.params.id);
    deleteParking(id);
    res.send(parkings);
});
// Update parking
app.put('/parkings/update/:id', (req, res) => {
    let id = parseInt(req.params.id);
    updateParking(id, req.body);
    console.log(parkings);
    res.send(parkings);
});
// Get a specofic parking
app.get('/parkings/:id', (req, res) => {
    res.send(parkings[req.params.id]);
});
// Fuctions to manage parkings -> array
// Delete one element
function deleteParking(id) {
    console.log("elemento a eliminar-> " + id);
    parkings.splice(id - 1, 1);
}
// Ad one element
function addParking(info) {
    //We asign all the info in each variable
    parkings.push(buildParking(info)); // We add a new parking
}
// Delete and add one element in a specific position
function updateParking(id, info) {
    deleteParking(id);
    let updatedParking = buildParking(info);
    parkings.splice(id - 1, 0, updatedParking);
}
// Build a new parking object
function buildParking(info) {
    let [address, ammenities, score, price, type, images, description] = [info.address,
        info.ammenities,
        info.score,
        info.price,
        info.type,
        info.images,
        info.description];
    let new_parkin = {
        address: address,
        ammenities: ammenities,
        score: score,
        price: price,
        type: type,
        images: images,
        description: description
    };
    return new_parkin;
}
// Run
app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`);
});
//# sourceMappingURL=app.js.map