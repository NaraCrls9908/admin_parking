import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Parking } from '../models/parking.model';
@Injectable({
  providedIn: 'root'
})

export class ParkingService {

  apiUrl = "http://localhost:8080/parkings";

  constructor(private httpClient: HttpClient) { }

  getAllParkings(){
    return this.httpClient.get<Parking[]>(this.apiUrl);
  }

}
