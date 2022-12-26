import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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
    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/get-one/${id}`);
  }

  addParking(data: Parking){
    return this.httpClient.post<ApiResponse>(`${this.apiUrl}/add`, data);
  }

  deleteParking(id: number){
    return this.httpClient.delete<ApiResponse>(`${this.apiUrl}/delete/${id}`);
  }

  updateParking(id:number, data: Parking){
    return this.httpClient.put<ApiResponse>(`${this.apiUrl}/update/${id}`, data);
  }

  getParkingsFilters(min_cost:number, max_cost:number, type:string, amenities:string) {
    let params = new HttpParams();
    params = min_cost != null ? params.set('min_cost', min_cost) : params.set('min_cost', ""); 
    params = max_cost != null ? params.set('max_cost', max_cost) : params.set('max_cost', ""); 
    params = type != null ? params.set('type', type) : params.set('type', ""); 
    params = amenities != null ? params.set('amenities', amenities) : params.set('amenities', ""); 

    return this.httpClient.get<ApiResponse>(`${this.apiUrl}/filters/`,{params});


  }

  
}
