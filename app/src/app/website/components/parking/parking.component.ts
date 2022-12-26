import { Component, Input, Output, EventEmitter } from '@angular/core';
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

  address = new FormControl();
  amenities = new FormControl();
  score = new FormControl();
  price = new FormControl();
  type = new FormControl();
  images = new FormControl();
  description = new FormControl();

  @Output() parkingId = new EventEmitter<number>(); 

  constructor(private parkingService: ParkingService){}

  ngOnInit(){
  }

  onShowDetail(){
    this.parkingId.emit(this.id);
  }
}
