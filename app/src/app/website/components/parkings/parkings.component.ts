import { Component } from '@angular/core';
import { ApiResponse, Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})

export class ParkingsComponent {
  apiResponse: ApiResponse | null = null;
  parkings: Parking[] = [];

  type = new FormControl();

  surv_cam = new FormControl();
  apartment = new FormControl();
  private_parking = new FormControl();
  parking_ceiling = new FormControl();
  ground_floor = new FormControl();
  battery = new FormControl();

  min_cost = new FormControl();
  max_cost = new FormControl();
  

  constructor(private parkingService: ParkingService){}
  
  
  ngOnInit(){
    this.getParking();
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    });
  }

  getParking(){
    this.parkingService.getAllParkings().subscribe(response =>{
      this.apiResponse = response
      this.parkings = this.apiResponse.data;
    })
  }

  updateParking(){
    let type = this.type.value;
    let min_cost = this.min_cost.value;
    let max_cost = this.max_cost.value;
    
    let surv_cam, apartment, private_parking, parking_ceiling,
        ground_floor, battery, amenities;

    surv_cam = this.surv_cam.value ? "Surveillance Camera" : null;
    apartment = this.apartment.value ? "Apartment" : null;
    private_parking = this.private_parking.value ? "Private Parking Lot" : null;
    parking_ceiling = this.parking_ceiling.value ? "Parking With Ceiling" : null;
    ground_floor = this.ground_floor.value ? "Ground Floor" : null;
    battery = this.battery.value ? "Battery-shaped places" : null;

    amenities = surv_cam ? surv_cam + "," : "",
    amenities += apartment ? apartment + "," : "",
    amenities += private_parking ? private_parking + "," : "",
    amenities += parking_ceiling ? parking_ceiling + "," : "",
    amenities += ground_floor ? ground_floor + "," : "",
    amenities += battery ? battery + "," : "",

    
    this.parkingService.getParkingsFilters(min_cost, max_cost, type, amenities).subscribe(response =>{
      this.apiResponse = response
      console.log(this.apiResponse.data);
    })


  }
}
