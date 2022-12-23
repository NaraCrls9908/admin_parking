import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WebsiteRoutingModule } from './website-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { LayoutComponent } from './components/layout/layout.component';
import { ParkingsComponent } from './components/parkings/parkings.component';
import { ParkingComponent } from './components/parking/parking.component';

@NgModule({
    declarations: [
      HomeComponent,
      LayoutComponent,
      ParkingsComponent,
      ParkingComponent
    ],
    imports: [
      CommonModule,
      WebsiteRoutingModule,
    ],
    providers: []
  })
  export class WebsiteModule { }
  