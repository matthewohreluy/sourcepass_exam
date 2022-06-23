import { Itask } from './../../shared/models/task.interface';
import { IEmployee } from './../../shared/models/employee.interface';
import { EmployeeService } from './../../shared/services/employee.service';
import { IProject } from './../../shared/models/project.interface';
import { ProjectService } from './../../shared/services/project.service';

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit, OnChanges {
  @Input() projectId!: number;
  project!: IProject | null;
  projectForm!: FormGroup;
  employees!: IEmployee[];
  constructor(public projectService: ProjectService,private fb: FormBuilder, public employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      taskName: ['',Validators.required],
      totalEstimate: ['', Validators.required],
      employee: ['',Validators.required],
      employeeEstimate: ['',Validators.required],
    })
    this.employeeService.employees$.subscribe((employees)=>{
      this.employees = employees;
      console.log(employees);
    })
  }

  ngOnChanges(){
    console.log(this.projectId);
    // get project
    this.findProject(this.projectId)
  }

  findProject(id: number){
    this.project = this.projectService.getProject(id)
  }

  onSubmit(){
    if (!this.projectForm.valid) {
      return;
    }
    // check if taskName exists, update, else add
    const taskIndex = this.projectService.getTaskIndex(this.projectId, this.projectForm.controls['taskName'].value);
    if(taskIndex == -1){
      // add
      const data: Itask = {
        taskId: this.project?.tasks.length!,
        projectId: this.project?.projectId!,
        taskName: this.projectForm.controls['taskName'].value,
        totalEstimate: this.projectForm.controls['totalEstimate'].value,
        totalEmployeeEstimate: this.projectForm.controls['employeeEstimate'].value,
        assignedEmployees: [
          {
            employeeId: this.projectForm.controls['employee'].value,
            employeeEstimate: this.projectForm.controls['employeeEstimate'].value
          }
        ]
      }
      this.project?.tasks.push(data);
      const project: IProject = {
        ...this.project!,
      }

    }else{
      // get tasks
      const task = this.projectService.getTask(this.projectId, taskIndex);
      console.log(task);
      const employee = task.assignedEmployees.find((emp)=>emp.employeeId === this.projectForm.controls['employee'].value)
      if(employee){
        task.assignedEmployees[task.assignedEmployees.findIndex((emp)=>emp.employeeId === this.projectForm.controls['employee'].value)] =  {
          employeeId: this.projectForm.controls['employee'].value,
          employeeEstimate: this.projectForm.controls['employeeEstimate'].value
        }
      }else{
        task.assignedEmployees.push( {
          employeeId: this.projectForm.controls['employee'].value,
          employeeEstimate: this.projectForm.controls['employeeEstimate'].value
        })
      }
      console.log(this.project!.tasks[taskIndex].assignedEmployees);
      const data: Itask = {
        taskId: taskIndex,
        projectId: this.project?.projectId!,
        taskName: this.projectForm.controls['taskName'].value,
        totalEstimate: this.projectForm.controls['totalEstimate'].value,
        assignedEmployees: task.assignedEmployees,
        totalEmployeeEstimate:  this.projectService.calculateEmployeeTotalEstimate(this.project!.tasks[taskIndex].assignedEmployees)
      }
      this.project!.tasks[taskIndex] = data;

    }
    const project: IProject = {
      ...this.project!,
    }

    this.projectService.updateProject(this.projectId,project);
  }
}
