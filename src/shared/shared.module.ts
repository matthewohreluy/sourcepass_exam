import { MaterialModule } from './modules/material.module';
import { NgModule } from "@angular/core";
import { HttpClientModule } from '@angular/common/http';
import { MapEmployeePipe } from './pipes/map-employee.pipe';

@NgModule({
imports:[
HttpClientModule,
MaterialModule],
exports: [MaterialModule,
  MapEmployeePipe],
declarations: [
  MapEmployeePipe
]
})

export class SharedModule{

}
