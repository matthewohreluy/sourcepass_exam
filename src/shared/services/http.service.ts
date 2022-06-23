import { APIRoutes } from './../constants/api_routes';
import { IEmployee } from '../models/employee.interface';

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class HttpService{

  constructor(private http: HttpClient){
  }

  getEmployees(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(APIRoutes.getEmployees)
  }
}
