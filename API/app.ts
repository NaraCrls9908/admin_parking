
import { privateDecrypt } from "crypto";

// Instancias para correr el proyecto
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


dotenv.config();
const port = 8080
const app = express();
app.use( express.json());
app.use(cors());

interface Parking {
    id: number
    address: String,
    amenities: String[],
    score: number,
    price: number,
    type: String,
    images: String[],
    description: String
}

let parkings: Parking[]= [
    {
        id: 123,
        address: 'Street A #35, California, CA,',
        amenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Battery-Shaped Places'],
        score: 3.8,
        price: 100,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'Cheap & nice parking with surveillance cameras. Parking on Ground floor'
    },
    {
        id: 234,
        address: 'Street B #27, California, CA',
        amenities: ['Surveillance Cam', 'Apartment', 'Parking With Ceiling'],
        score: 4.2,
        price: 175,
        type: 'Public',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High security parking for those who are looking for his safety.'
    },
    {
        id: 345,
        address: 'Street C #7, California, CA',
        amenities: ['Surveillance Cam', 'Apartment', 'Ground Floor', 'Parking With Ceiling', 'Private Parking Lot'],
        score: 4.8,
        price: 200,
        type: 'Private',
        images: ['foto1', 'foto2', 'foto3'],
        description: 'High luxury and security parking. Private parking with surveillance cameras, private parking for your car, aditionali we can wash your car.'
    }
]

let parkings_filtered: Parking[];

// Is my API working?
app.get('/', (req, res)=> {
    res.send("Hi! I'm your API and I'm working");
});


// Routes for parkings
// Get all parkings
app.get('/parkings', (req, res)=> {
    res.send({title: "Response of parkings/", status: "Ok", message: "Data of parkings has been given.", data: parkings, type: "GET"});
})
// Create parking
app.post('/parkings/add', (req, res)=> {
    if (addParking(req.body))  
        res.send({title: "Response of parkings/add", status: "Ok", message: "A new parking has been created.", data: parkings[parkings.length-1], type: "POST"});
    else 
        res.send({title: "Response of parkings/add", status: "Failed", message: "The parking couldn't be created.", data: parkings[parkings.length-1], type: "POST"});
})
// Delete parking
app.delete('/parkings/delete/:id', (req, res)=> {
    let id = parseInt(req.params.id)
    deleteParking(id);
    res.send({title: "Response of parkings/delete", status: "Ok", message: "Parking " + id + " has been deleted.", data: [], type: "DELETE"});

})
// Update parking
app.put('/parkings/update/:id', (req, res)=> {
    let id = parseInt(req.params.id);
    if (updateParking(parseInt(req.params.id), req.body))
            res.send({title: "Response of parkings/update", status: "Ok", message: "Parking " + (id) + " has been updated.", data: parkings[id], type: "PUT"});
    else 
        res.send({title: "Response of parkings/update", status: "Failed", message: "The parking couldn't be updated.", data: [], type: "PUT"})
})
// Get a specific parking
app.get('/parkings/get-one/:id', (req, res)=> {
    let id = parseInt(req.params.id);
    let parking = getOneParking(id);
    if(parking != null) 
        res.send({title: "Response of parkings/byId", status: "Ok", message: "Parking " + id + " has been given.", data: parking, type: "GET"});
    else
        res.send({title: "Response of parkings/byId", status: "Not Working", message: "Parking " + id + " has not been found.", data: [], type: "GET"});
});
// Get parking filtered by Min and Max
app.get('/parkings/filters', (req, res)=> {                     
    parkings_filtered = parkings;
    // We asing the params
    let min_cost = parseFloat(req.query.min_cost.toString());
    let max_cost = parseFloat(req.query.max_cost.toString());
    let type = req.query.type.toString();
    let amenities = req.query.amenities.toString();
    // NaN to null in MIN and MAX cost
    if(isNaN(min_cost)) min_cost = null;
    if(isNaN(max_cost)) max_cost = null;
    // We work the parkings_filtered to be filter
    filterByMinMaxCost(min_cost, max_cost);
    filterByType(type);
    filterByAmenities(amenities);
    
    if(parkings_filtered.length < 0)
        res.send({title: "Response of parkings/filtered", status: "Failed", message: "Data not found", data: [], type: "GET"})
    else
        res.send({title: "Response of parkings/filtered", status: "Ok", message: "Data of parkings with filters has been given.", data: parkings_filtered, type: "GET"});

})


// Fuctions to manage parkings -> array
// Delete one element
function deleteParking(id:number) {
    parkings.forEach((parking, i) => {
        if(parking.id == id) parkings.splice(i, 1);
    });
}

function getOneParking(id){
    let oneParking: Parking;
    parkings.forEach((parking) => {
        if(parking.id == id) {
            oneParking = parking;
        }
    });

    return oneParking;
}

// Ad one element
function addParking(info) {
    //We asign all the info in each variable
    let new_parking = buildParking(info);
    if(new_parking) {
        let id = parkings[parkings.length-1].id+ 1;
        new_parking.id = id;
        parkings.push(new_parking); // We add a new parking
        return true
    }   

    return false;
}
// Delete and add one element in a specific position
function updateParking(id:number, info) {
    parkings.forEach((parking, i) => {
        if(parking.id == id) {
            let updatedParking = buildParking(info, id)  
            if(updatedParking) {
                deleteParking(id);
                parkings.splice(i, 0, updatedParking); // We add the updated parking in the same position
                return true;
            }
        }
    });
    
    
    return true;
}
// Build a new parking object
function buildParking(info, id?:number) {
    let [address, amenities, score, price, type, images, description] =[
                                                                        info.address, 
                                                                        info.amenities, 
                                                                        info.score,
                                                                        info.price,
                                                                        info.type,
                                                                        info.images,
                                                                        info.description]
    
    
    
    let new_parking: Parking = {
        id: id != null ? id : null,
        address: address,
        amenities: amenities,
        score: score,
        price: price,
        type: type,
        images: images,
        description: description
    } 
    return validateParking(new_parking) ? new_parking : null;
}

function validateParking(parking:Parking) {
    if (parking){
        if(parking.address != null && 
                parking.type != null && 
                    parking.description != null &&
                        parking.price > 0 &&
                            (parking.score > 0 && parking.score < 5) &&
                                parking.images != null) {
                                    return true            
        }
    }

    return false
}

function filterByMinMaxCost(min_cost:number, max_cost:number) {
    if (min_cost != null && max_cost != null)
        parkings_filtered = parkings.filter(parking => parking.price >= min_cost && parking.price <= max_cost);
    else if(min_cost != null)
        parkings_filtered = parkings.filter(parking => parking.price >= min_cost);
    else if(max_cost != null)
        parkings_filtered = parkings.filter(parking => parking.price <= max_cost);
    else // Here we have no filters
        parkings_filtered = parkings;
}

function filterByType(type:string) {
    if(type)
        parkings_filtered = parkings_filtered.filter(parking => parking.type == type);
}

function filterByAmenities(amenitiesArg:string) {  
    let parkings_aux: Parking[] = [];
    if(amenitiesArg) {
        let amenities = amenitiesArg.split(",");
        parkings_filtered.forEach(parking => {
            amenities.forEach(amenitie => {
                if(parking.amenities.includes(amenitie.trim())) parkings_aux.push(parking);
            })
        })
    
        parkings_filtered = parkings_aux.filter((item, index)=>{
            return parkings_aux.indexOf(item) == index;
        });
    }else {
        parkings_filtered = parkings_filtered;
    }
}

// Run
app.listen(port, () => {
    console.log(`Corriendo en el puerto: ${port}`)
})