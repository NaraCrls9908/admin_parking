import { Component } from '@angular/core';
import { ParkingService } from 'src/app/services/parking.service';
import { FormControl } from '@angular/forms';
import { ApiResponse, Parking } from 'src/app/models/parking.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  apiResponse: ApiResponse = {
    title: '',
    status: '', 
    message: '',
    type: '',
    data: []
  };

  parking: Parking = {
    address: "",
    amenities: [],
    score: 0,
    price: 0,
    type: "",
    images: [],
    description: ""
  };
  address = new FormControl();
  amenities = new FormControl();
  score = new FormControl();
  price = new FormControl();
  type = new FormControl();
  images = new FormControl();
  description = new FormControl();

  constructor(private parkingService: ParkingService){}

  saveParking(){
    this.parking.address = this.address.value;
    this.parking.amenities = this.amenities.value;
    this.parking.score = this.score.value;
    this.parking.price = this.price.value;
    this.parking.type = this.type.value;
    this.parking.images = this.images.value;
    this.parking.description = this.description.value;

    this.parkingService.addParking(this.parking).subscribe(response =>{


      if(response.status == "Ok" ){
        this.apiResponse = response;
        Swal.fire({
          icon: 'success' ,
          title: 'Parking has created!',
          text: this.apiResponse.message,
        })
        window.setInterval(() =>{
          location.reload();
        }, 1000);
      }

      if(response.status == "Failed"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: this.apiResponse.message,
        })
      }

      console.log(this.apiResponse);

    })

  }


}
