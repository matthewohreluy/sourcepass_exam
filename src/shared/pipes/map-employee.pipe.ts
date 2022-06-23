import { EmployeeService } from './../services/employee.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapEmployee'
})
export class MapEmployeePipe implements PipeTransform{
  constructor(private employeeService: EmployeeService){}
    transform(value: number): string{
     return this.employeeService.mapEmployeeName(value)
    }
}
