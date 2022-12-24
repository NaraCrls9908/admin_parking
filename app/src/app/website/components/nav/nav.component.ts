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

  apiResponse: ApiResponse | null = {
    title: '',
    status: '', 
    message: '',
    type: '',
    data: []
  };

  parking: Parking = {
    address: "",
    ammenities: [],
    score: 0,
    price: 0,
    type: "",
    images: [],
    description: ""
  };
  address = new FormControl();
  ammenities = new FormControl();
  score = new FormControl();
  price = new FormControl();
  type = new FormControl();
  images = new FormControl();
  description = new FormControl();

  constructor(private parkingService: ParkingService){}

  saveParking(){
    this.parking.address = this.address.value;
    this.parking.ammenities = this.ammenities.value;
    this.parking.score = this.score.value;
    this.parking.price = this.price.value;
    this.parking.type = this.type.value;
    this.parking.images = this.images.value;
    this.parking.description = this.description.value;

    this.parkingService.addParking(this.parking).subscribe(data =>{
      if(data.status = "Ok" ){
        this.apiResponse = data;
        Swal.fire(
          'Parking has created!',
          this.apiResponse.message,
          'success'
        )
        window.setInterval(() =>{
          location.reload();
        }, 1000);
      }

      if(data.status = "Failed"){
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Please check your info!',
        })
      }
    })

  }


}
