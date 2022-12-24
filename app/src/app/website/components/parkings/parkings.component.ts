import { Component } from '@angular/core';
import { ApiResponse, Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})

export class ParkingsComponent {
  apiResponse: ApiResponse | null = null;
  parkings: Parking[] = [
    // {
    //   address: "Street A #35, California, CA",
    //   ammenities: ["Surveillance cameras","Covered drawer","Department","Low level","Closed parking","Place in battery"],
    //   score: 5,
    //   price: 100,
    //   type: "Public",
    //   images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"],
    //   description: "The best of all the parking lots you can find, this one meets all the amenities."
    // },
    // {
    //   address: "Street B #27, California, CA",
    //   ammenities: ["Surveillance cameras","Covered drawer","Department","Low level"],
    //   score: 3.8,
    //   price: 175,
    //   type: "Private",
    //   images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"],
    //   description: "Good parking lot that fulfills its purpose, in addition to being guarded and has apartments"
    // },
    // {
    //   address: "Street C #7, California, CA",
    //   ammenities: ["Closed parking","Place in battery"],
    //   score: 2.6,
    //   price: 200,
    //   type: "Public",
    //   images: ["1.jpg","2.jpg","3.jpg","4.jpg","5.jpg"],
    //   description: "Simple parking, serves its main purpose"
    // }, 
  ];

  constructor(private parkingService: ParkingService){}
  
  
  ngOnInit(){
    this.getParking();
  }

  getParking(){
    this.parkingService.getAllParkings().subscribe(response =>{
      this.apiResponse = response
      this.parkings = this.apiResponse.data;
    })
  }

  updateParking(){

  }
}
