import { Component, Input } from '@angular/core';
import { ApiResponse, Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent {
  @Input() parking: Parking = {
      address: "",
      amenities: [],
      score: 0,
      price: 0,
      type: "",
      images: [],
      description: ""
  }

  @Input() id: number = 0;

  apiResponse: ApiResponse = {
    title: '',
    status: '', 
    message: '',
    type: '',
    data: []
  };

  showParkingDetail = false;
  address = new FormControl();
  amenities = new FormControl();
  score = new FormControl();
  price = new FormControl();
  type = new FormControl();
  images = new FormControl();
  description = new FormControl();

  constructor(private parkingService: ParkingService){}

  ngOnInit(){
    this.address.setValue(this.parking.address);
    this.amenities.setValue(this.parking.amenities);
    this.score.setValue(this.parking.score);
    this.price.setValue(this.parking.price);
    this.type.setValue(this.parking.type);
    this.images.setValue(this.parking.images);
    this.description.setValue(this.parking.description);

  }

  deleteParking(id: number){
    // console.log(this.parkingId)
    this.parkingService.deleteParking(id + 1).subscribe(response =>{
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
    })
  }

  updateParking(id: number){
    this.parking.address = this.address.value;
    this.parking.amenities = this.amenities.value;
    this.parking.score = this.score.value;
    this.parking.price = this.price.value;
    this.parking.type = this.type.value;
    this.parking.images = this.images.value;
    this.parking.description = this.description.value;

    console.log(id)
    let idAux = id + 1
    this.parkingService.updateParking(id, this.parking).subscribe(response =>{


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

    })

  }

  toggleParkingDetail(){
    this.showParkingDetail = !this.showParkingDetail;
  }
}
