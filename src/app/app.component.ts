import { EmployeeService } from './../shared/services/employee.service';
import { ProjectService } from './../shared/services/project.service';

import { HttpService } from './../shared/services/http.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  projectId!: number;
  constructor(public projectService: ProjectService, public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.onGetProjects();
    this.onGetEmployees();
  }

  onGetProjects(): void{
    this.projectService.getProjects();
    this.projectService.projects$.subscribe(console.log)
  }

  onGetEmployees():void{
    this.employeeService.getEmployees();
  }

  openForm(id: number){
    this.projectId = id;
  }
}
