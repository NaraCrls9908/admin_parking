import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApiResponse, Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent {
  @Input() parking: Parking = {
      id: 0,
      address: "",
      amenities: [],
      score: 0,
      price: 0,
      type: "",
      images: [],
      description: ""
  }

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

  priceMonths: number = 1200

  @Output() parkingId = new EventEmitter<number>(); 

  constructor(private parkingService: ParkingService){}

  ngOnInit(){
  }

  onShowDetail(){
    this.parkingId.emit(this.parking.id);
  }
}
