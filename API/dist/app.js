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
        amenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Battery-shaped places'],
        score: 3.8,
        price: 100,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'Cheap & nice parking with surveillance cameras. Parking on Ground floor'
    },
    {
        address: 'Street B #27, California, CA',
        amenities: ['Surveillance Cam', 'Apartment', 'Parking with ceiling'],
        score: 4.2,
        price: 175,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High security parking for those who are looking for his safety.'
    },
    {
        address: 'Street C #7, California, CA',
        amenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Parking with ceiling', 'Private Parking Lot'],
        score: 4.8,
        price: 200,
        type: 'Private',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High luxury and security parking. Private parking with surveillance cameras, private parking for your car, aditionali we can wash your car.'
    }
];
let parkings_filtered;
// Is my API working?
app.get('/', (req, res) => {
    res.send("Hi! I'm your API and I'm working");
});
// Routes for parkings
// Get all parkings
/* app.get('/parkings', (req, res)=> {
    res.send({title: "Response of parkings/", status: "Ok", message: "Data of parkings has been given.", data: parkings, type: "GET"});
}) */
// Create parking
app.post('/parkings/add', (req, res) => {
    console.log("body de la req: ", req.body);
    if (addParking(req.body))
        res.send({ title: "Response of parkings/add", status: "Ok", message: "A new parking has been created.", data: parkings[parkings.length - 1], type: "POST" });
    else
        res.send({ title: "Response of parkings/add", status: "Failed", message: "The parking couldn't be created.", data: parkings[parkings.length - 1], type: "POST" });
});
// Delete parking
app.delete('/parkings/delete/:id', (req, res) => {
    let id = parseInt(req.params.id);
    deleteParking(id);
    res.send({ title: "Response of parkings/delete", status: "Ok", message: "Parking " + id + " has been deleted.", data: [], type: "DELETE" });
});
// Update parking
app.put('/parkings/update/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (id < parkings.length) {
        if (updateParking(id, req.body))
            res.send({ title: "Response of parkings/update", status: "Ok", message: "Parking " + id + " has been updated.", data: parkings[id - 1], type: "PUT" });
    }
    else
        res.send({ title: "Response of parkings/update", status: "Failed", message: "The parking couldn't be updated.", data: [], type: "PUT" });
});
// Get a specific parking
app.get('/parkings/get-one/:id', (req, res) => {
    let id = parseInt(req.params.id);
    if (id < parkings.length)
        res.send({ title: "Response of parkings/byId", status: "Ok", message: "Parking " + id + " has been given.", data: parkings[id - 1], type: "GET" });
    else
        res.send({ title: "Response of parkings/byId", status: "Not Working", message: "Parking " + id + " has not been found.", data: [], type: "GET" });
});
// Get parking filtered by Min and Max
app.get('/parkings/', (req, res) => {
    parkings_filtered = parkings;
    // We asing the params
    if (req.query) {
        let min_cost = parseFloat(req.query.min_cost.toString());
        let max_cost = parseFloat(req.query.max_cost.toString());
        let type = req.query.type.toString();
        let amenities = req.query.amenities.toString();
        // NaN to null in MIN and MAX cost
        if (isNaN(min_cost))
            min_cost = null;
        if (isNaN(max_cost))
            max_cost = null;
        // We work the parkings_filtered to be filter
        filterByMinMaxCost(min_cost, max_cost);
        filterByType(type);
        filterByAmenities(amenities);
    }
    if (parkings_filtered.length <= 0)
        res.send({ title: "Response of parkings/filtered", status: "Failed", message: "Data not found", data: parkings_filtered, type: "GET" });
    else
        res.send({ title: "Response of parkings/filtered", status: "Ok", message: "Data of parkings with filters has been given.", data: parkings, type: "GET" });
});
// Fuctions to manage parkings -> array
// Delete one element
function deleteParking(id) {
    parkings.splice(id - 1, 1);
}
// Ad one element
function addParking(info) {
    //We asign all the info in each variable
    let new_parking = buildParking(info);
    if (new_parking) {
        parkings.push(new_parking); // We add a new parking
        return true;
    }
    return false;
}
// Delete and add one element in a specific position
function updateParking(id, info) {
    deleteParking(id);
    let updatedParking = buildParking(info);
    if (updatedParking) {
        parkings.splice(id - 1, 0, updatedParking); // We add the updated parking in the same position
        return true;
    }
    return false;
}
// Build a new parking object
function buildParking(info) {
    let [address, amenities, score, price, type, images, description] = [info.address,
        info.amenities,
        info.score,
        info.price,
        info.type,
        info.images,
        info.description];
    let new_parking = {
        address: address,
        amenities: amenities,
        score: score,
        price: price,
        type: type,
        images: images,
        description: description
    };
    return validateParking(new_parking) ? new_parking : null;
}
function validateParking(parking) {
    if (parking) {
        if (parking.address != null &&
            parking.type != null &&
            parking.description != null &&
            parking.price > 0 &&
            (parking.score > 0 && parking.score < 5) &&
            parking.images != null) {
            return true;
        }
    }
    return false;
}
function filterByMinMaxCost(min_cost, max_cost) {
    if (min_cost != null && max_cost != null)
        return parkings_filtered = parkings.filter(parking => parking.price >= min_cost && parking.price <= max_cost);
    else if (min_cost != null)
        return parkings_filtered = parkings.filter(parking => parking.price >= min_cost);
    else if (max_cost != null)
        return parkings_filtered = parkings.filter(parking => parking.price <= max_cost);
    else // Here we have no filters
        return parkings;
}
function filterByType(type) {
    if (parkings_filtered != null) {
        if (type)
            return parkings_filtered = parkings_filtered.filter(parking => parking.type == type);
    }
    else {
        if (type)
            return parkings_filtered = parkings.filter(parking => parking.type == type);
    }
    return parkings; // Here we have no filters;
}
function filterByAmenities(amenitiesArg) {
    let amenities = amenitiesArg.split(",");
    amenities = amenities.map(amenitie => amenitie.trim());
    let parkings_aux = [];
    if (amenities) {
        parkings_filtered.forEach(parking => {
            amenities.forEach(amenitie => {
                if (parking.amenities.includes(amenitie)) {
                    parkings_aux.push(parking);
                }
            });
        });
        return parkings_filtered = parkings_aux.filter((item, index) => {
            return parkings_aux.indexOf(item) === index;
        });
    }
    return parkings; // Here we have no filters
}
// Run
app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`);
});
//# sourceMappingURL=app.js.map