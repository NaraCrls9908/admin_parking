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
    res.send({ title: "Response of parkings/", status: "Ok", message: "Data of parkings has been given.", data: parkings, type: "GET" });
});
// Create parking
app.post('/parkings/add', (req, res) => {
    console.log("body de la req: ", req.body);
    addParking(req.body);
<<<<<<< HEAD
    res.send({ title: "Response of parkings/add", status: "Ok", message: "A new parking has been created.", type: "POST" });
=======
    res.send({ title: "Response of parkings/add", status: "Ok", message: "A new parking has been created.", data: parkings[parkings.length - 1], type: "POST" });
>>>>>>> 82dab86494b29667d592fd6a7c11e72636eeebc1
});
// Delete parking
app.delete('/parkings/delete/:id', (req, res) => {
    let id = parseInt(req.params.id);
    deleteParking(id);
<<<<<<< HEAD
    res.send({ title: "Response of parkings/delete", status: "Ok", message: "Parking " + id + " has been deleted.", type: "DELETE" });
=======
    res.send({ title: "Response of parkings/delete", status: "Ok", message: "Parking " + id + " has been deleted.", data: [], type: "DELETE" });
>>>>>>> 82dab86494b29667d592fd6a7c11e72636eeebc1
});
// Update parking
app.put('/parkings/update/:id', (req, res) => {
    let id = parseInt(req.params.id);
<<<<<<< HEAD
    updateParking(id, req.body);
    console.log(parkings);
    res.send({ title: "Response of parkings/update", status: "Ok", message: "Parking " + id + " has been updated.", type: "PUT" });
=======
    if (id < parkings.length) {
        updateParking(id, req.body);
        res.send({ title: "Response of parkings/update", status: "Ok", message: "Parking " + id + " has been updated.", data: parkings[id - 1], type: "PUT" });
    }
    else
        res.send({ title: "Response of parkings/update", status: "Not Working", message: "Parking " + id + " has not been found.", data: [], type: "PUT" });
>>>>>>> 82dab86494b29667d592fd6a7c11e72636eeebc1
});
// Get a specofic parking
app.get('/parkings/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (id < parkings.length)
        res.send({ title: "Response of parkings/byId", status: "Ok", message: "Parking " + id + " has been given.", data: parkings[id - 1], type: "GET" });
    else
        res.send({ title: "Response of parkings/byId", status: "Not Working", message: "Parking " + id + " has not been found.", data: [], type: "GET" });
});
// Fuctions to manage parkings -> array
// Delete one element
function deleteParking(id) {
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
    let new_parking = {
        address: address,
        ammenities: ammenities,
        score: score,
        price: price,
        type: type,
        images: images,
        description: description
    };
    return new_parking;
}
// Run
app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`);
});
//# sourceMappingURL=app.js.map