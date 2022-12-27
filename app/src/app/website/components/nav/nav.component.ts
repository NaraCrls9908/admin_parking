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
    id: 0,
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

  entry = new FormControl();
  exit = new FormControl();

  difference: number = 0;

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

  quote(){
    
    if( (this.entry.value != null) && (this.exit.value != null)){
      
      let [yearDateEntry, monthDateEntry, dayDateEntry] = this.entry.value.toString().split("-");
      let [yearDateExit, monthDateExit, dayDateExit] = this.exit.value.toString().split("-");
      let date1 = new Date(this.entry.value);
      let date2 = new Date(this.exit.value);
      if (date1 > date2) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'The first date must be less than the second.',
        })
      }else{
        let differenceMoth = (yearDateExit - yearDateEntry) * 12; 
        differenceMoth += monthDateExit - monthDateEntry;
        this.difference = differenceMoth  
        if(differenceMoth == 0){
          differenceMoth = 1;
        }
        
      }
  
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You must select both dates.',
      })
    }

  }


}
