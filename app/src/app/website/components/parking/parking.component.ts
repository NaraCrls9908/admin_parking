import { Component, Input } from '@angular/core';
import { Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';

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

  @Input() id: number = 0;

  constructor(private parkingService: ParkingService){}

  deleteParking(id: number){
    // console.log(this.parkingId)
    this.parkingService.deleteParking(id + 1).subscribe(response =>{
      console.log(response)
    })
  }

  updateParking(){
    console.log()
  }

  seeAllInfo(){

  }
}
