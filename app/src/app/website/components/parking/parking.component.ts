import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/models/parking.model';

@Component({
  selector: 'app-parking',
  templateUrl: './parking.component.html',
  styleUrls: ['./parking.component.scss']
})
export class ParkingComponent {
  @Input() parking: Parking = {
      address: "",
      ammenities: [],
      score: 0,
      price: 0,
      type: "",
      images: [],
      description: ""
  }
}