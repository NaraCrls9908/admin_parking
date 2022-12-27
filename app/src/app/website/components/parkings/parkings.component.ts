import { Component } from '@angular/core';
import { ApiResponse, ApiResponseOne, Parking } from 'src/app/models/parking.model';
import { ParkingService } from 'src/app/services/parking.service';
import { FormControl } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-parkings',
  templateUrl: './parkings.component.html',
  styleUrls: ['./parkings.component.scss']
})

export class ParkingsComponent {
  apiResponse: ApiResponse | null = null;
  parkings: Parking[] = [];

  parkingResponse: ApiResponseOne = {
    title: '',
    status: '', 
    message: '',
    type: '',
    data: {
      id: 0,
      address: "",
      amenities: [],
      score: 0,
      price: 0,
      type: "",
      images: [],
      description: ""
    }
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
  }
  // Form controls for filters
  type = new FormControl();
  surv_cam = new FormControl();
  apartment = new FormControl();
  private_parking = new FormControl();
  parking_ceiling = new FormControl();
  ground_floor = new FormControl();
  battery = new FormControl();
  min_cost = new FormControl();
  max_cost = new FormControl();
  aux_filters: number = 0;

  
  address = new FormControl();
  amenities = new FormControl();
  score = new FormControl();
  price = new FormControl();
  inType = new FormControl();
  images = new FormControl();
  description = new FormControl();

  showParkingDetail = false;
  parkingId: number = 0;

  constructor(private parkingService: ParkingService){}
  
  
  ngOnInit(){
    this.getParking();
    $(document).ready(function () {
      $('#sidebarCollapse').on('click', function () {
          $('#sidebar').toggleClass('active');
      });
    });
  }

  changeRadioButtons(aux:number) {
    
    if(aux==0){
      console.log("cambio de privado a publico");
      $("input[type=radio][name=type_private]").prop('checked', false)
    }else if(aux==1){
      console.log("cambio de publico a privado");
      $("input[type=radio][name=type_public]").prop('checked', false)
    }
  }

  getParking(){
    this.aux_filters = 0;
    this.parkingService.getAllParkings().subscribe(response =>{
      this.apiResponse = response
      this.parkings = this.apiResponse.data;
    });
    // Set radio buttons = false
    $("input[type=radio][name=type_public]").prop('checked', false);
    $("input[type=radio][name=type_private]").prop('checked', false);
    // Set checked boxes = false
    $("input[type=checkbox][name=surv_cam]").prop('checked', false);
    $("input[type=checkbox][name=apartment]").prop('checked', false);
    $("input[type=checkbox][name=private_parking]").prop('checked', false);
    $("input[type=checkbox][name=parking_ceiling]").prop('checked', false);
    $("input[type=checkbox][name=ground_floor]").prop('checked', false);
    $("input[type=checkbox][name=battery]").prop('checked', false);
    
    $("input[type=number][name=min_cost]").prop('value', "");
    $("input[type=number][name=max_cost]").prop('value', "");
    



  }

  fileteredParkings(){
    this.aux_filters = 1;
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
      this.apiResponse = response;
      console.log("respuesta de los filtros-> " + this.apiResponse.data)
      this.parkings = this.apiResponse.data;
    });

    if(this.parkings.length == 0) this.aux_filters = 2;
  }

  deleteParking(){
    const id = this.parkingId;
    console.log('Funcion delete - id ' + id);
    this.parkingService.deleteParking(id).subscribe(response =>{
      console.log(response);
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
        })
      }
    })
  }

  updateParking(){
    const id = this.parkingId
    this.parking.address = this.address.value;
    this.parking.amenities = this.amenities.value;
    this.parking.score = this.score.value;
    this.parking.price = this.price.value;
    this.parking.type = this.inType.value;
    this.parking.images = this.images.value;
    this.parking.description = this.description.value;
    
    
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
        })
      }

    })

  }

  onShowDetail(id:number){
    this.parkingId = id;
    console.log('Funcion showDetail - id ' + id)
    this.parkingService.getParkingById(id).subscribe(response =>{
      this.parkingResponse = response;
      this.parking = response.data;
      this.address.setValue(this.parking.address);
      this.amenities.setValue(this.parking.amenities);
      this.score.setValue(this.parking.score);
      this.price.setValue(this.parking.price);
      this.inType.setValue(this.parking.type);
      this.images.setValue(this.parking.images);
      this.description.setValue(this.parking.description);
      this.toggleParkingDetail();
    });
  }

  toggleParkingDetail(){
    this.showParkingDetail = !this.showParkingDetail;
  }
  
}
