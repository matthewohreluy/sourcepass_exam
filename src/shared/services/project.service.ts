import { take } from 'rxjs/operators';

import { LocalStorageService } from "./local-storage.service";
import { PROJECT } from "../constants/project.constant";
import { IProject } from "../models/project.interface";

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Itask } from "../models/task.interface";


@Injectable({
  providedIn: 'root'
})
export class ProjectService{
  projects: IProject[] = PROJECT;
  private projectSubject = new BehaviorSubject<IProject[]>([]);
  public projects$: Observable<IProject[]> = this.projectSubject.asObservable();
  constructor(private localStorageService: LocalStorageService){}

  getProjects(){
    // check if in local storage, if not get data from constants
    const projects: IProject[] = this.localStorageService.getLocalStorageObject<IProject[]>('projects');
    if(projects){
      this.projectSubject.next(projects);
    }else{
      this.projectSubject.next(this.projects);
      // store project to localstorage
      this.localStorageService.saveLocalStorageObject('projects',this.projects);
    }
  }

  getProject(id: number): IProject | null{
    const project = this.projectSubject.getValue().find((projectObj)=> projectObj.projectId === id);
    if(project){
      return project;
    }
    return null;
  }

  getTaskIndex(projectId: number, taskName: string): number{
    return this.projectSubject.getValue()[this.projectSubject.getValue().findIndex((projObj)=>projObj.projectId === projectId)].tasks.findIndex((taskObj)=> taskObj.taskName === taskName)
  }

  getTask(projectId: number, taskId: number): Itask{
    console.log(this.projectSubject.getValue()[this.projectSubject.getValue().findIndex((projObj)=>projObj.projectId === projectId)]);
    return this.projectSubject.getValue()[this.projectSubject.getValue().findIndex((projObj)=>projObj.projectId === projectId)].tasks.find((taskObj)=> taskObj.taskId === taskId)!
  }

  updateProject(projectId: number,data: IProject){
    const projects = this.projectSubject.getValue();
    const projectIndex = projects.findIndex(project => project.projectId === projectId);
    const newProject = projects.slice(0);
    newProject[projectIndex]={
      ...projects[projectIndex],
      ...data
    }
    // calculate employee total estimate
    // this.calculateEstimate(newProject[projectIndex].tasks)
    this.projectSubject.next(newProject);
    // add to localstorage
    this.projects$.pipe(
      take(1)
    ).subscribe((response)=>{
      this.localStorageService.saveLocalStorageObject('projects',response);
      console.log(response);
    })

  }

  calculateEmployeeTotalEstimate(assignedEmployees: {employeeId: number, employeeEstimate: number}[]){
    return assignedEmployees.reduce((acc, obj)=>{
      return acc + obj.employeeEstimate
    },0)
  }
}
