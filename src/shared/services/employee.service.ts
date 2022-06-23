import { HttpService } from './http.service';
import { LocalStorageService } from "./local-storage.service";
import { IEmployee } from "../models/employee.interface";

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService{

  private employeeSubject = new BehaviorSubject<IEmployee[]>([]);
  public employees$: Observable<IEmployee[]> = this.employeeSubject.asObservable();
  constructor(private localStorageService: LocalStorageService, private httpService: HttpService){}

  getEmployees(){
    const employees: IEmployee[] = this.localStorageService.getLocalStorageObject<IEmployee[]>('employees');
    if(employees){
      this.employeeSubject.next(employees);
    }else{
      this.httpService.getEmployees().pipe(
        take(1),
        map((employees)=>{
          return employees.map((employee: any)=>{
            return {
              employeeId: employee.id,
              name: employee.name,
              taskIds: []
            }
          })
        })
      )
      .subscribe((employeesResponse)=>{
        this.employeeSubject.next(employeesResponse);
        this.localStorageService.saveLocalStorageObject('employees',employeesResponse);
      })
    }
  }

  mapEmployeeName(id: number): string{
    return this.employeeSubject.getValue().find((obj)=>obj.employeeId === id)?.name!;
  }
}
