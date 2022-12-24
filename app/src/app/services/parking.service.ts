import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiResponse, Parking } from '../models/parking.model';
@Injectable({
  providedIn: 'root'
})

export class ParkingService {

  apiUrl = "http://localhost:8080/parkings";

  constructor(private httpClient: HttpClient) { }

  getAllParkings(){
    return this.httpClient.get<ApiResponse>(this.apiUrl);
  }

  getParkingById(id: number){
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/${id}`);
  }

  deleteParking(id: number){
    return this.httpClient.delete(`${this.apiUrl}/delete/${id}`);
  }

  updateParking(data: Parking){
    return this.httpClient.put(`${this.apiUrl}/add`, data);
  }
}
