
import { privateDecrypt } from "crypto";

// Instancias para correr el proyecto
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { clearScreenDown } from "readline";
import { rmSync } from "fs";

dotenv.config();


const port = 8080
const app = express();
app.use( express.json());

interface Parking {
    address: String,
    ammenities: String[],
    score: Number,
    price: Number,
    type: String,
    images: String[],
    description: String
}

let parkings: Parking[]= [
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
]

// Is my API working?
app.get('/', (req, res)=> {
    res.send("Hi! I'm your API and I'm working");
});

// Routes for parkings
// Get all parkings
app.get('/parkings', (req, res)=> {
    res.send(parkings);
})
// Create parkings
app.post('/add-parking', (req, res)=> {
    console.log("body de la req: ", req.body);
    addParking(req.body);  
    res.send(parkings)
})

app.delete('/delete-parking/:id', (req, res)=> {
    let id = parseInt(req.params.id)
    deleteParking(id);
    res.send(parkings);

})

app.put('/update-parking/:id', (req, res)=> {
    let id = parseInt(req.params.id)
    updateParking(id, req.body);

    console.log(parkings);
    res.send(parkings);
})

app.get('/parkings/:id', (req, res)=> {
    res.send(parkings[req.params.id]);
})


// Fuctions
function deleteParking(id:number) {
    console.log("elemento a eliminar-> " + id);
    parkings.splice(id-1, 1);
}

function addParking(info) {
    //We asign all the info in each variable
    parkings.push(buildParking(info)); // We add a new parking
}

function updateParking(id:number, info) {
    deleteParking(id);
    let updatedParking = buildParking(info)
    parkings.splice(id-1, 0, updatedParking);
}

function buildParking(info) {
    let [address, ammenities, score, price, type, images, description] = [info.address, 
        info.ammenities, 
        info.score,
        info.price,
        info.type,
        info.images,
        info.description]

        let new_parkin: Parking = {
        address: address,
        ammenities: ammenities,
        score: score,
        price: price,
        type: type,
        images: images,
        description: description
        } 
    return new_parkin;
}

app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`)
})